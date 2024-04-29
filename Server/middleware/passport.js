var GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(new GoogleStrategy({
    clientID: '1025500720040-uu91fv1q3rtshckfeaddv9iqf5madhhc.apps.googleusercontent.com',
    clientSecret: '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',
    callbackURL: "http://www.example.com/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, cb) {
    User.findOrCreate({ googleId: profile.id }, function (err, user) {
      return cb(err, user);
    });
  }
));