const allowedOrigins = [
  "http://localhost:5000",
  "http://localhost:5173",
  "https://event-majesty.vercel.app",
  "http://event-majesty.vercel.app",
  "https://event-majesty-backend.vercel.app",
  "http://event-majesty-backend.vercel.app"
];

const corsOptions = {
  origin: (origin, callback) => {
    // Allow requests with no origin (like Postman, mobile apps)
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true, // allow cookies / auth headers
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
};

export default corsOptions;