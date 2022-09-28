const GoogleStrategy = require("passport-google-oauth20").Strategy;
const passport = require("passport");
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.clientID,
      clientSecret: process.evn.clientSecret,
      callbackURL: "/auth/login",
      scope: ["profile", "email"],
    },
    (profile, callback) => {
      callback(null, profile);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});
