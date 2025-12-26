import express from "express";
import passport from "./config/passport.js";
import cors from "cors";
import mongoose from "mongoose";
import authRouter from "./routes/authRoutes.js";
import corsOptions from "./config/cors.js";
import dotenv from "dotenv";

dotenv.config();
// Connect to MongoDB
mongoose.connect(String(process.env.MONGO_URI))
    .then(()=> console.log("MongoDb Connected!"))
    .catch(err => console.log(err))


const app = express();

// CORS
app.use(cors(corsOptions));

app.use(passport.initialize());


// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// app.js or index.js
app.use("/auth", authRouter);

// Health check
app.get("/", (req, res) => {
  res.send("<a href='/auth/google/callback'>Google Authentication</a>");
});

app.get("/auth-success", (req, res) => {
  res.send("Login successful...");
});


app.listen(5000,()=>{
    console.log("Server Started!")
})
