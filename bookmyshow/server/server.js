const express = require("express");
const app = express();
require("dotenv").config(); // load environment variables
/**
 * import - ES6 module syntax to import modules
 * require - CommonJS syntax to import modules
 *
 */
const connectDB = require("./config/db");
const usersRouter = require("./routes/userRoutes");

connectDB();
// console.log("process", process);
/**
 * Routes
 */
app.use(express.json());
app.use("/api/users", usersRouter);

app.listen(8082, () => {
  console.log("Server is running on port 8082");
});
