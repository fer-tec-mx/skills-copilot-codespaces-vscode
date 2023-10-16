// Create a web server

// Import the express module
const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');

// Handle the GET request for getting all comments
router.get('/', commentController.getAllComments);

