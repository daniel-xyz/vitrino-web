let express = require('express');
let passport = require('passport');
let router = express.Router();

let User = require("./server/models/user");

function ensureAuthenticated(req, res, next) {
  "use strict";
  if (req.isAuthenticated()) {
    next();
  } else {
    req.flash("info", "Bitte logge dich ein, um die gewünschte Seite zu sehen.");
    res.redirect("/login");
  }
}

router.use(function(req, res, next) {
  "use strict";
  res.locals.currentUser = req.user;
  res.locals.errors = req.flash('error');
  res.locals.infos = req.flash('info');
  next();
});

router.get('/', function(req, res) {
  "use strict";
  res.render('index.html', {
    page_title: 'Startseite',
    port: router.get('port')
  });
});

router.get('/signup', function(req, res) {
  "use strict";
  res.render('signup.html', {
    page_title: 'Registrieren'
  });
});

router.post('/signup', function(req, res, next) {
  "use strict";
  let username = req.body.username;
  let password = req.body.password;

  User.findOne({ username: username }, function(err, user) {

    if (err) {
      return next(err);
    }

    if (user) {
      req.flash('error', 'User already exists');
      return res.redirect('/signup');
    }

    let newUser = new User({
      username: username,
      password: password
    });

    newUser.save(next);
  });
}, passport.authenticate('local-login', {
  successRedirect: '/',
  failureRedirect: '/signup',
  failureFlash: true
}));

router.get('/users', function(req, res, next) {
  "use strict";
  User.find()
    .sort({createdAt: 'descending' })
    .exec(function(err, users) {

      if (err) {
        return next (err);
      }

      res.render('userlist.html', {
        page_title: 'Benutzerliste',
        users: users
      });
    });
});

router.get('/users/:username', function(req, res, next) {
  "use strict";
  User.findOne({ username: req.params.username }, function(err, user) {

    if (err) {
      return next(err);
    }

    if (!user) {
      return next(404);
    }

    res.render('profile.html', {
      user: user
    });
  });
});

router.get('/login', function(req, res) {
  "use strict";
  res.render('login.html', {
    page_title: 'Einloggen'
  });
});

router.post('/login', passport.authenticate('local-login', {
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: true
}));

router.get('/logout', function(req, res) {
  "use strict";
  req.logout();
  res.redirect('/');
});

router.get('/edit', ensureAuthenticated, function (req, res) {
  "use strict";
  res.render('edit.html', {
    page_title: 'Profil bearbeiten'
  });
});

router.post('/edit', ensureAuthenticated, function (req, res, next) {
  "use strict";
  let newPassword = req.body.newPassword;
  let newPasswordConfirm = req.body.newPasswordConfirm;

  if (newPassword !== newPasswordConfirm) {
    req.flash("error", "Die Wiederholung des Passworts stimmt nicht mit der ersten Eingabe überein.");
    return res.redirect('/edit');
  }

  req.user.password = newPassword;

  req.user.save(function(err) {

    if (err) {
      next(err);
      return;
    }

    req.flash("info", "Dein Profil wurde erfolgreich gespeichert!");
    res.redirect('/edit');
  });
});

module.exports = router;
