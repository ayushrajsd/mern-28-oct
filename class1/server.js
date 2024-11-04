const http = require("http");

const server = http.createServer((req, res) => {
  res.setHeader("Content-Type", "text/html");
  //   res.write("Hello, World! from Node.js");
  // write a html response
  res.write("<h1>Hello, World! from Node.js</h1>");
  res.write("<p>This is a paragraph</p>");
  res.end();
});

const port = 8000;
const hostname = "localhost";
server.listen(port, hostname, () => {
  console.log(`Server is running at http://${hostname}:${port}`);
});
