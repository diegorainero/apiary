// apiary/server/routes/arnie-route.js
// Import express
const express = require('express');

// Import arnie-controller
const arnieRoutes = require('../controllers/arnie-controller.js');

// Create router
const router = express.Router();

// Add route for POST request to create new book
// In server.js, books route is specified as '/books'
// this means that '/create' translates to '/books/create'
router.post('/create', arnieRoutes.arnieCreate);

// Add route for PUT request to delete specific book
// In server.js, books route is specified as '/books'
// this means that '/delete' translates to '/books/delete'
router.put('/delete', arnieRoutes.arnieDelete);

// Add route for PUT request to reset bookshelf list
// In server.js, books route is specified as '/books'
// this means that '/reset' translates to '/books/reset'
router.put('/reset', arnieRoutes.arnieReset);

// Add route for POST request to retrieve all arnie selecting an Apiary
// In server.js, arnie route is specified as '/apiari/arnie'
// this means that '/all' translates to '/apiari/arnie/all'
router.get('/', arnieRoutes.arnieAll);

// Export router
module.exports = router;
