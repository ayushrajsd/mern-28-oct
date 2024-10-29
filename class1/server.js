const http = require("http");

const server = http.createServer((req, res) => {
  res.setHeader("Content-Type", "text/plain");
  res.write("Hello, World! from Node.js asdasdasd");
  res.end();
});

const port = 3000;
const hostname = "localhost";
server.listen(port, hostname, () => {
  console.log(`Server is running at http://${hostname}:${port}`);
});
