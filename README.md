[![Build Status](https://travis-ci.com/Flur3x/Vitrino.svg?token=HAauytqpvPqx5oqGBkQp&branch=master)](https://travis-ci.com/Flur3x/Vitrino)

# Vitrino

### Requirements

  - git
  - node.js and npm (latest versions)
  

### Getting started

Create an account on github.com if you don't have one. If you have never used git before, check this out: https://help.github.com/articles/set-up-git/

If everything is set up, clone the project via git:

```
$ git clone https://github.com/Flur3x/Vitrino.git
```

Download all necessary dependencies:

```
$ npm install
```

Start the node.js server locally:

```
$ node app.js
```

#### Test accounts

For testing purposes, there are always three different accounts setup and free for use:

| E-Mail                  | Password    | Role   |
|-------------------------|-------------|--------|
| dummy.admin@vitrino.de  | Vitrino2017 | admin  |
| dummy.vendor@vitrino.de | Vitrino2017 | vendor |
| dummy.user@vitrino.de   | Vitrino2017 | user   |


#### Setting up Heroku

This project is hosted on Heroku. All pushes to the github master branch will automatically be deployed after the build succeded in Travis CI.

Sign up for a heroku.com account and install the toolbelt (https://toolbelt.heroku.com/) and tell us your mail so we can give you access to the project.

Once installed, you're able to use the heroku cli. Log in using the email address and password for Heroku:

```
$ heroku login
```

Additional information: https://devcenter.heroku.com/articles/getting-started-with-nodejs#set-up


### Development

To build the project and activate the watcher (which triggers on any further code changes automatically), type:

```
$ grunt
```

When you want to commit changes, please commit to the github master branch. The deployment to heroku (production) will be triggered within seconds automatically.


#### ESLint

To disable eslint rule warnings you have several options:

- put a **/* eslint-disable */** block comment at the top of the file to disable rule warnings in an entire file
- put a **// eslint-disable-line** comment next to a line to disable warnings for that specific line

More options: http://eslint.org/docs/user-guide/configuring


#### Database

To connect to the postgreSQL CLI:

```
$ heroku pg:psql --app vitrino DATABASE
```


##### Some useful commands

**\d** - lists all tables within the database

**\q** - quit


#### Testing

Start the test runner with:

```
$ grunt test
```

To run it-tests, it's necessary to setup a local PostgreSQL database and create the database named 'vitrino_test'. When the database is running, start the tests with:

```
$ grunt test-it
```
