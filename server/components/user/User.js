let mongoose = require('mongoose');
let bcrypt = require('bcrypt-nodejs');

let SALT_FACTOR = 10;

let userSchema = mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

let noop = function() {};

userSchema.pre('save', function(done) {
  let user = this;

  if (!user.isModified('password')) {
    return done();
  }

  bcrypt.genSalt(SALT_FACTOR, function(err, salt) {
    if (err) {
      return done(err);
    }

    bcrypt.hash(user.password, salt, noop, function(err, hashedPassword) {
      if (err) {
        return done(err);
      }

      user.password = hashedPassword;
      done();
    });
  });
});

userSchema.methods.checkPassword = function(guess, done) {
  bcrypt.compare(guess, this.password, function (err, isMatch) {
    done(err, isMatch);
  });
};

userSchema.methods.findById = function(id, done) {
  userSchema.findById(id, function(err, user) {
    done(err, user);
  });
};

userSchema.methods.findOne = function(username, done) {
  userSchema.findOne({ username: username }, function(err, user) {
    done(err, user);
  });
};

let User = mongoose.model('User', userSchema);

module.exports = User;