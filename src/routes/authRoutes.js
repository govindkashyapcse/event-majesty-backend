// routes/authRoutes.js
import express from "express";
import passport from "passport";
import bcrypt from "bcryptjs";
import User from "../models/User.js";
import {generateToken} from "../utils/generateToken.js";


const authRouter = express.Router();

/* Register */
authRouter.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  const hashed = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email, password: hashed , provider: "email"});

  res.json({
    token: generateToken(user),
    user
  });
});

/* Login (Email) */
authRouter.post("/login",
  passport.authenticate("local", { session: false }),
  async (req, res) => {
    
    res.json({
      token: generateToken(req.user),
      user: req.user
    });
  }
);

/* Google Login */
authRouter.get('/google', passport.authenticate('google',{scope: ['profile','email']}))
authRouter.get('/google/callback', passport.authenticate('google',{session: false, failureRedirect: '/'}),
    (req,res)=>{
        const token = generateToken(req.user)
        res.redirect(`/auth-success?token=${token}`)
    }
)

export default authRouter;
