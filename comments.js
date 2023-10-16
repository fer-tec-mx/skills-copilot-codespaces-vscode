// Create a web server

// Import express
const express = require('express');

// Create a new express application
const app = express();

// Tell express to serve static files from the static/ directory
app.use(express.static('static'));

// Tell express to parse URL-encoded data
app.use(express.urlencoded({ extended: false }));

// Tell express to parse JSON data
app.use(express.json());

// Start the web server on port 3000
app.listen(3000, () => {
  console.log('Server started at http://localhost:3000/');
});

// Create an array to store comments
const comments = [];

// Handle GET /comments
app.get('/comments', (req, res) => {
  // Send back the comments array as JSON
  res.json(comments);
});

// Handle POST /comments
app.post('/comments', (req, res) => {
  // Read the name and comment from the request body
  const name = req.body.name;
  const comment = req.body.comment;

  // Create a new comment object
  const newComment = {
    name: name,
    comment: comment
  };

  // Add the comment to the comments array
  comments.push(newComment);

  // Send back the new comment as JSON
  res.json(newComment);
});
