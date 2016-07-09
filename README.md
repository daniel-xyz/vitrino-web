# Vitrino

### Requirements

  - git
  - node.js and npm (latest version)
  

### Getting started

Create an account on github.com if you don't have one. If you use an IDE like IntelliJ which has a github integration, the login to your github account is quite convenient. Otherwise, if you have to use the command line and need help, take a look here: https://help.github.com/articles/set-up-git/

If your github account is authenticated, clone the project via git:

```
$ git clone https://github.com/Flur3x/Vitrino.git
```

Now that you have the project, download all necessary dependencies:

```
$ npm install
```

Now you can start the node.js server locally:

```
$ node app.js
```


### Setting up Heroku

We use Heroku as our cloud service. All pushes to the github master branch are automatically deployed to it. It is also possible to start the node.js server locally within the Heroku environment, which is recommended.

First, sign up for a heroku.com account and install the toolbelt (https://toolbelt.heroku.com/) and tell us your mail so we can give you access to the project.

Once installed, use the heroku command from your command shell. Log in using the email address and password for heroku:

```
$ heroku login
```

Open the productive website by typing:

```
$ heroku open
```

To start a local server via Heroku, use this command:

```
$ heroku local
```

Additional information about this process can be found here: https://devcenter.heroku.com/articles/getting-started-with-nodejs#set-up


### Development

We use grunt as task runner. To build the project, use the 'grunt' command:

```
$ grunt
```

While developing, it is recommended to use "grunt watch" which triggers grunt immediately on code changes:

```
$ grunt watch
```

When you want to commit changes, use the github master branch. They'll be deployed to heroku within seconds automatically.