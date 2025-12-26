// config/passport-google.js
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from "bcryptjs";
import User from "../models/User.js";


passport.use(new GoogleStrategy({
  clientID: String(process.env.GOOGLE_CLIENT_ID),
  clientSecret: String(process.env.GOOGLE_CLIENT_SECRET),
  callbackURL: "/auth/google/callback",
  scope: ['profile','email']
} ,async (accessToken, refreshToken, profile, done) => {
  try{
    let user = await User.findOne({providerId: profile.id, provider: 'google'})
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
}));

passport.use(new LocalStrategy({ usernameField: "email" },
    async (email, password, done) => {
      try {
        const user = await User.findOne({ email , provider: "email"});
        if (!user) return done(null, false, { message: "User not found" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return done(null, false, { message: "Wrong password" });

        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  )
);

passport.serializeUser( (user, done)=> done(null, user))
passport.deserializeUser( (user, done)=> done(null, false))

export default passport;