import passport from "passport";
import dotenv from "dotenv";
dotenv.config();
import { connectDB } from "./config/db.js";
import app from "./app.js";
import "./config/passportLocal.js";
import "./config/passportGoogle.js";
import authRouter from "./routes/authRoutes.js";



// Connect to MongoDB
connectDB();


app.use(passport.initialize());


// app.js or index.js
app.use("/auth", authRouter);
// app.use("/api/events", require("./routes/eventRoutes"));
// app.use("/api/register", require("./routes/registrationRoutes"));
// // app.js or index.js
// app.use("/api/dashboard", require("./routes/dashboardRoutes"));



const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});