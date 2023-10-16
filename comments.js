// Create a web server
// 1. Create a web server that listens on port 3000
// 2. Respond to all requests with a file from the "public" folder
// 3. If the file doesn't exist, respond with a 404 status code
// 4. If the request is for the root, respond with the index.html file
// 5. Respond to requests to POST /comments with a 201 status code

const http = require("http");
const fs = require("fs");
const path = require("path");
const port = 3000;
const commentsPath = path.join(__dirname, "comments.json");

const server = http.createServer((req, res) => {
  console.log(`${req.method} ${req.url}`);

  const index = path.join(__dirname, "public", "index.html");
  const publicPath = path.join(__dirname, "public");
  const filePath = path.join(__dirname, "public", req.url);
  const comments = require("./comments.json");

  if (req.method === "GET" && req.url === "/comments") {
    res.setHeader("Content-Type", "application/json");
    res.setHeader("X-Powered-By", "bacon");
    res.end(JSON.stringify(comments));
  } else if (req.method === "POST" && req.url === "/comments") {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
    });
    req.on("end", () => {
      body = JSON.parse(body);
      comments.push(body);
      fs.writeFile(commentsPath, JSON.stringify(comments), (err) => {
        if (err) {
          throw err;
        }
        res.statusCode = 201;
        res.end(JSON.stringify(body));
      });
    });
  } else if (req.method === "GET" && req.url === "/") {
    fs.readFile(index, (err, data) => {
      if (err) {
        throw err;
      }
      res.setHeader("Content-Type", "text/html");
      res.end(data);
    });
  } else if (req.method === "GET" && req.url !== "/") {
    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.statusCode = 404;
        res.end("File not found!");
      } else {
        res.setHeader("Content-Type", "text/html");
        res.end(data);