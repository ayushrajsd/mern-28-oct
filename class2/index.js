const express = require("express");

// create an express app
const app = express();
// purpose of express.json() is to parse the incoming JSOB reqest and make the data available under req.body
app.use(express.json());

// define a route
app.get("/", (req, res) => {
  res.send("hello, Express!");
});

app.get("/about", (req, res) => {
  res.send("this is about page");
});

app.post("/data", (req, res) => {
  //   console.log(req);
  console.log(req.body);
  res.send("this is post request");
});

// RESTful API - use proper verbs for the routes / request

const users = [
  { id: 1, name: "user 1" },
  { id: 2, name: "user 2" },
];

app.post("/users", (req, res) => {
  const newUser = req.body;
  const userId = users.length + 1;
  newUser.id = userId;
  users.push(newUser);
  res.status(201).json({ message: "User created", user: newUser });
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
