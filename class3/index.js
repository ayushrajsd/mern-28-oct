// app.use(express.static("public"));

// const loggerMiddleware = (req, res, next) => {
//   console.log(`Logged  ${req.url}  ${req.method} -- ${new Date()}`);
//   next(); // telling express to proceed to another middleware or route handler
// };

// // app.use(loggerMiddleware);

// app.get("/", (req, res) => {
//   res.send("Hello, Express!");
// });

// app.get("/data", (req, res) => {
//   console.log("This is data page");
//   res.send("This is data page");
// });

// app.get("/special", loggerMiddleware, (req, res) => {
//   res.send("this route is special");
// });

// app.get("/search", (req, res) => {
//   const queryParams = req.query;
//   const { name, filter } = queryParams; // destructuring the object

//   res.send("your parameters are " + JSON.stringify(queryParams));
// });

/**
 * 404 pages - if someones enters a random url
 * if the request does not match any of the routes, return a 404 status and a message
 *
 * Solution approach
 * a. app.use() - a middleware that will be executed for all the requests
 * b. if no route match is found then return a 404
 */
// app.use((req, res, next) => {
//   res.status(404).send("Page not found");
// });

// mongoose
//   .connect(dbURL)
//   .then(function (connection) {
//     console.log("Connected to MongoDB");
//   })
//   .catch(function (err) {
//     console.log("Error connecting to MongoDB");
//   });

const express = require("express");
const connectDB = require("./config/db");
const productRouter = require("./routes/productRoutes");

console.log(productRouter);

const app = express();
connectDB();

app.use(express.json());
const print = (req, res, next) => {
  console.log("Request received at ", req.url, req.method);
  next();
};
app.use("/api/products", productRouter);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
