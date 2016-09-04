# Vitrino

### Requirements

  - git
  - node.js and npm (latest versions)
  

### Getting started

Create an account on github.com if you don't have one. If you use an IDE like IntelliJ which has a github integration, the login to your github account is quite convenient. Otherwise, if you have to use the command line and need help, take a look here: https://help.github.com/articles/set-up-git/

If your github account is authenticated, clone the project via git:

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


### Setting up Heroku

We use Heroku as our cloud service. All pushes to the github master branch are automatically deployed to it. It is also possible to start the node.js server locally within the Heroku environment, which is recommended since the environment variables like the mongoDB uri woruldn't be taken otherwise.

Sign up for a heroku.com account and install the toolbelt (https://toolbelt.heroku.com/) and tell us your mail so we can give you access to the project.

Once installed, you're able to use the heroku cli. Log in using the email address and password for Heroku:

```
$ heroku login
```

Open the productive website by typing:

```
$ heroku open
```

Start a local server (and connect to the external mongoDB sandbox database):

```
$ heroku local
```

Additional information about this process can be found here: https://devcenter.heroku.com/articles/getting-started-with-nodejs#set-up


### Development

To build the project and activate the watcher (which triggers on any further code changes automatically), type:

```
$ grunt
```

When you want to commit changes, please commit to the github master branch. The deployment to heroku (production) will be triggered within seconds automatically.

### Database

When starting the app with the "heroku local" command, the app will try to connect to the mongoDB database specified in the ".env"-file. If the connection can't be established or you haven't started the app within the heroku environment, it will look for a local running mongoDB.

### Testing

Start the test runner with:

```
$ grunt test
```
