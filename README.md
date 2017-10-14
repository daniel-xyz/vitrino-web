# Vitrino Web

### Requirements

  - node.js v8.0
  - npm v5.0
  

### Getting started

Download all necessary dependencies:

```
$ npm install
```

Run the app locally:

```
$ npm run dev
```

#### Test accounts

For testing purposes, there are always three different accounts setup and free for use:

| E-Mail                  | Password    | Role   |
|-------------------------|-------------|--------|
| dummy.admin@vitrino.de  | Vitrino2017 | admin  |
| dummy.vendor@vitrino.de | Vitrino2017 | vendor |
| dummy.user@vitrino.de   | Vitrino2017 | user   |


#### Setting up Heroku

This project is hosted on Heroku. All pushes to the github master branch will automatically be deployed.

Sign up for a heroku.com account and install the toolbelt (https://toolbelt.heroku.com/) and tell us your mail so we can give you access to the project.

Once installed, you're able to use the heroku cli. Log in using the email address and password for Heroku:

```
$ heroku login
```

Additional information: https://devcenter.heroku.com/articles/getting-started-with-nodejs#set-up


#### Database

To connect to the postgreSQL CLI:

```
$ heroku pg:psql --app vitrino DATABASE
```


##### Some useful commands

**\d** - lists all tables within the database

**\q** - quit


#### Misc
Build for production and view the bundle analyzer report:

```
$ npm run build --report
```
