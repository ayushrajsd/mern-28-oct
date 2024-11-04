const express = require("express");

// create an express app
const app = express();

// define a route
app.get("/", (req, res) => {
  res.send("hello, Express!");
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
