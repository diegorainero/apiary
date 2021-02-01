// bookshelf-app/server/controllers/books-controller.js

// Import database
const knex = require('../db');

// Retrieve all apiario
exports.apiarioAll = async (req, res) => {
	// Get all books from database
	knex.select('*') // select all records
		.from('apiario') // from 'books' table
		.then((userData) => {
			// Send books extracted from database in response
			res.json(userData);
		})
		.catch((err) => {
			// Send a error message in response
			res.json({
				message: `There was an error retrieving apiari: ${err}`,
			});
		});
};

// Create new apiario
exports.apiarioCreate = async (req, res) => {
	// Add new book to database
	knex('apiario')
		.insert({
			// insert new record, a book
			name: req.body.name,
			location: req.body.location,
			lat: req.body.lat,
			long: req.body.long,
		})
		.then(() => {
			// Send a success message in response
			res.json({
				message: `Apiario \'${req.body.name}\' sito in ${req.body.location}.`,
			});
		})
		.catch((err) => {
			// Send a error message in response
			res.json({
				message: `There was an error creating ${req.body.name}: ${err}`,
			});
		});
};

// Remove specific Apiario
exports.apiarioDelete = async (req, res) => {
	// Find specific book in the database and remove it
	knex('apiario')
		.where('id', req.body.id) // find correct record based on id
		.del() // delete the record
		.then(() => {
			// Send a success message in response
			res.json({ message: `Apiario ${req.body.id} cancellato.` });
		})
		.catch((err) => {
			// Send a error message in response
			res.json({
				message: `There was an error deleting ${req.body.id} apiario: ${err}`,
			});
		});
};

// Remove all Apiario on the list
exports.apiarioReset = async (req, res) => {
	// Remove all books from database
	knex.select('*') // select all records
		.from('apiario') // from 'books' table
		.truncate() // remove the selection
		.then(() => {
			// Send a success message in response
			res.json({ message: 'Lista degli apiari cancellati.' });
		})
		.catch((err) => {
			// Send a error message in response
			res.json({
				message: `Ci sono stati errori nella cancellazione della lista degli apiari: ${err}.`,
			});
		});
};
