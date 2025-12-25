import express from "express";
import passport from "passport";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config/db.js";
import "./config/passportLocal.js";
import "./config/passportGoogle.js";
import authRouter from "./routes/authRoutes.js";
import corsOptions from "./config/cors.js";

dotenv.config();
const app = express();

// Connect to MongoDB
connectDB();
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
  res.send("API is running...");
});

app.listen(5000,()=>{
    console.log("Server Started!")
})
