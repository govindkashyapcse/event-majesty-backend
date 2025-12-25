// config/passport-google.js
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import User from "../models/User.js";


passport.use(
  new GoogleStrategy(
    {
      clientID: toString(process.env.GOOGLE_CLIENT_ID),
      clientSecret: toString(process.env.GOOGLE_CLIENT_SECRET),
      callbackURL: "/auth/google/callback"
    },
    async (_, __, profile, done) => {
      try {
        let user = await User.findOne({ googleId: profile.id });

        if (!user) {
          user = await User.create({
            googleId: profile.id,
            name: profile.displayName,
            email: profile.emails[0].value
          });
        }

        done(null, user);
      } catch (err) {
        done(err);
      }
    }
  )
);