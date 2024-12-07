const express = require("express");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const app = express();
require("dotenv").config(); // load environment variables
/**
 * import - ES6 module syntax to import modules
 * require - CommonJS syntax to import modules
 *
 */
const connectDB = require("./config/db");
const usersRouter = require("./routes/userRoutes");
const movieRouter = require("./routes/movieRoutes");
const theatreRouter = require("./routes/theatreRoutes");
const showRouter = require("./routes/showRoutes");
const bookingRouter = require("./routes/bookingRoutes");

connectDB();
// console.log("process", process);
/**
 * Routes
 */
app.use(express.json());
app.use(helmet());

/**
 * security provisions
 */
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  message: "Too many requests from this IP, please try again after sometime",
});

app.use("/api/", apiLimiter);

/**
 * routes definition
 */
app.use("/api/users", usersRouter);
app.use("/api/movies", movieRouter);
app.use("/api/theatres", theatreRouter); // /api/theatres - POST
app.use("/api/shows", showRouter); // /api/theatres - POST
app.use("/api/bookings", bookingRouter);

app.listen(8082, () => {
  console.log("Server is running on port 8082");
});
