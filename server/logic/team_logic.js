'use strict'

const db = require('../utilities/mongo_connection')
const MsLogger = require('@first-lego-league/ms-logger').Logger()

exports.deleteValidation = function (params) {
  try {
    return db.connection().then(connection => {
      return connection.db().collection('teams').findOne({ _id: params.id }).then(team => {
        if (team) {
          deleteMatchesForTeam(team.number)
        }
      })
    })
  } catch (e) {
    MsLogger.error(e)
    return false
  }
}

exports.editValidation = function (params) {
  return db.connection().then(connection => {
    return connection.db().collection('teams').findOne({ _id: params._id }).then(originalTeam => {
      if (params.number != originalTeam.number) {
        return false
      }
      return true
    })
  }).catch(err => {
    MsLogger.error(err)
    throw err
  })
}

exports.createValidation = function (params) {
  return db.connection().then(connection => {
    return connection.db().collection('teams').find({ number: params.number }).toArray().then(teams => {
      if (teams.length > 0) {
        return false
      }
      return true
    })
  }).catch(err => {
    MsLogger.error(err)
    throw err
  })
}

function deleteMatchesForTeam (teamNumber) {
  db.connection().then(connection => {
    return connection.db().collection('matches').updateMany({ 'matchTeams.teamNumber': teamNumber },
      { $set: { 'matchTeams.$.teamNumber': 'null' } }
    )
  }).then(dbResponse => {
    if (dbResponse.modifiedCount > 0) {
      MsLogger.info('Matches were updates successfully')
    }
  }).catch(err => {
    MsLogger.error(err)
    throw err
  })
}