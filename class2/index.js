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

/**
 *
 * arr - ["a", "b", "c"]
 * arr.findIndex((item) => item === "z") // -1
 */
app.post("/users", (req, res) => {
  const newUser = req.body;
  const userId = users.length + 1;
  newUser.id = userId;
  users.push(newUser);
  res.status(201).json({ message: "User created", user: newUser });
});

/**
 * /users/1
 * /users/2
 */
app.delete("/users/:id", (req, res) => {
  const userId = req.params.id;
  console.log(userId);
  // find the user index by the id
  // delete the user from the users array
  const userIndex = users.findIndex((user) => user.id == userId);
  if (userIndex === -1) {
    return res.status(404).json({ message: "User not found" });
  }
  users.splice(userIndex, 1);
  res.json({ message: "User deleted" });
});

app.get("/users", (req, res) => {
  res.json(users);
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
