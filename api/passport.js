const passport = require("passport");
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const GOOGLE_CLIENT_ID = "671550549123-f2k22qokvpemp7ttnct42k0cl52emtdh.apps.googleusercontent.com";
const GOOGLE_SLIENT_SECRET = "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";

passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "http://www.example.com/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    done(null,profile)
  }
));

passport.serializeUser((user,done) =>{
    done(null,user);
})

passport.deserializeUser((user,done) =>{
    done(null,user);
})