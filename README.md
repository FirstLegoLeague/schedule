[![npm](https://img.shields.io/npm/v/@first-lego-league/tournament.svg)](https://www.npmjs.com/package/@first-lego-league/tournament)
[![codecov](https://codecov.io/gh/FirstLegoLeague/tournament/branch/master/graph/badge.svg)](https://codecov.io/gh/FirstLegoLeague/tournament)
[![Build status](https://ci.appveyor.com/api/projects/status/5bpjj78yjb5xcab9/branch/master?svg=true)](https://ci.appveyor.com/project/2roy999/tournament/branch/master)
[![GitHub](https://img.shields.io/github/license/FirstLegoLeague/tournament.svg)](https://github.com/FirstLegoLeague/tournament/blob/master/LICENSE)

# Tournament Module

This module is used as an API that handles all the tournament specific data.
Data like  teams, matches, table names and more.

## The API

The API is REST based, The available models are detailed below.

- team

```json
{
    number: number,
    name: string,
    affiliation: string, // optional
    cityState: string, // optional
    country: string, // optional
    coach1: string, // optional
    coach2: string, // optional
    judgingGroup: number // optional
    pitNumber: number, // optional
    pitLocation: number, // optional
    translationNeeded: boolean // optional
}
```

- match

```json
{
  matchId: number,
  startTime: date,
  endTime: date,
  stage: string,
  matchTeams: [
    {
      teamNumber: number,
      tableId: number
    }
  ]
}
```

- table

```json
{
  tableId: number,
  tableName: string
}
```

And this are the available endpoints for those models:

- GET ```/model/all```    - return all the objects
- GET ```/model/:id```    - return the object with that id
- POST ```/model```       - add a new object (as described later)
- PUT ```/model/:id```    - edit the object with that id
- DELETE ``/model/:id``   - delete the object with that id

There are 2 more APIs available, the Images API and the Tournament Settings API

### The Images API

Used to retrieve images for the Display.
Please be noted that the images are retrieved and sent with Base64 encoding.

The endpoint is ``/image`` and the available options are:

- GET ``/all`` - returns an array of all the images.
- GET ``/:imageName`` - returns the image with the specified name The response structure:

```json
{
  imageName: image-name,
  image: base64 encoding image
}
```

- POST ``/`` - Used to add a new image.
Body with that structure:

```json
{
  imageName: image-name,
  image:
}
```

- DELETE ``/:imageName`` - Used to delete an image

### The Tournament Settings API

There is no option to add a setting with this api. This API is for reading and updating the settings.

- GET ``/settings/:settingName`` - Returns the setting with settingName
- PUT ``/settings/:settingName`` - Updates the setting with settingName, The body of the request:

```

  {
     setting: settingContent
  }

```

**Be aware that reading the data is available for all, but updating/deleting/inserting only for certain users.**

 ---------------------------------------

## Development environment

This module uses the Yarn package manager. To run the module in a development environment

- type `yarn` to install all the dependencies of the project (module).
- type `yarn start` to start the server. The server listens on port 3000.

Two points to note:

1. MongoDB must be available on your system PATH i.e. PATH must include the path to `mongod.exe`. MongoDb is started by `yarn start` so it must not be running already.
2. The `mhub` server is started by `yarn start`. It too must not be already running (which will happen if an installed version of the TMS Scoring Software is running).

## Publishing to NPM

When you are ready to publish to npm

- run the command `yarn publish` from the repo root directory.
- You will be asked to update the version number.
- Following that the script will run the build `ng build --prod` and publish the artifacts to `@first-lego-league/tournament`.

Notes:

- You must be a member of the `npm` `first-lego-league` organization to publish the package.
- Verify version in npm [@first-lego-league/tournament] after the publish has completed (https://www.npmjs.com/package/@first-lego-league/tournament)
- Remember to push package.xml (containing the updated version).

## Adding new version to the `launcher`

Please see the [launcher README](https://github.com/FirstLegoLeague/Launcher/blob/readme-update/README.md#module-updates) for instructions on how to include your update in the `launcher` build.

## Contributing

To contribute to this repository, please make a fork, make your changes and submit a pull request.

This way of work allows us to maintain proper code quality, which is important when working with a large amount of people on the same project.

The best way to work on a feature or a bug is to follow these steps:

- fork the repository to your own github account
- if already forked, make sure your fork is up to date with the base repo
- create a new branch for your feature or bugfix
- work
- test
- create a pull request to merge your development branch into a branch in the base repo
- we will review your pull request, when ok, we will merge it into master
