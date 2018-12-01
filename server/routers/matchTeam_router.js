'use strict'
const express = require('express')

const db = require('../utilities/mongo_connection')

const MsLogger = require('@first-lego-league/ms-logger').Logger()

const RANDOM_ID_LENGTH = 25
const stages = [
  {
    stageName: 'practice',
    matchAmount: 1
  },
  {
    stageName: 'ranking',
    matchAmount: 3
  }
]

exports.getRouter = function () {
  const router = express.Router()

  router.get('/:team/matches', (req, res) => {
    db.connection().then(connection => {
      connection.db().collection('matches').find({'matchTeams.teamNumber': parseInt(req.params.team)}).toArray().then(data => {
        if (!data || data.length === 0) {
          res.send(getDefaultMatchesForTeam(parseInt(req.params.team), stages))
          return
        }

        res.send(data)
      })
    }).catch(err => {
      console.log(err)
      MsLogger.error(err)
      res.sendStatus(500)
    })
  })

  return router
}

function getDefaultMatchesForTeam (teamNumber, stages) {
  const matches = []

  for (const stage in stages) {
    for (let i = 1; i <= stages[stage].matchAmount; i++) {
      const match = {}
      match._id = createRandomId(RANDOM_ID_LENGTH)
      match.stage = stages[stage].stageName
      match.matchId = i
      match.matchTeams = [{
        'teamNumber': teamNumber,
        'tableId': null
      }]
      matches.push(match)
    }
  }

  return matches
}

function createRandomId (length) {
  let text = ''
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

  for (let i = 0; i < length; i++) { text += possible.charAt(Math.floor(Math.random() * possible.length)) }

  return text
}
