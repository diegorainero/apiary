// bookshelf-app/server/controllers/books-controller.js

// Import database
const knex = require('../db')
console.log('PROVA');
// Retrieve all arnie
exports.arnieAll = async (req, res) => {
  // Get all books from database
  console.log('DENTRO ARNIE %o',req.body.id);
  knex
    .select('*') // select all records
    .from('arnia') // from 'books' table
    .where('location_id' , req.body.id)
    .then(userData => {
      // Send books extracted from database in response
      res.json(userData)
      console.log('DENTRO LE ARNIE');
    })
    .catch(err => {
      // Send a error message in response
      res.json({ message: `There was an error retrieving apiari: ${err}` })
    })
}

// Create new apiario
exports.arnieCreate = async (req, res) => {
  // Add new book to database
  knex('arnia')
    .insert({ // insert new record, a book
      'name': req.body.name,
      'location_id': req.body.location_id
    })
    .then(() => {
      // Send a success message in response
      res.json({ message: `Arnia \'${req.body.name}\' sito in ${req.body.location_id}.` })
    })
    .catch(err => {
      // Send a error message in response
      res.json({ message: `There was an error creating ${req.body.name}: ${err}` })
    })
}

// Remove specific Apiario
exports.arnieDelete = async (req, res) => {
  // Find specific book in the database and remove it
  knex('arnia')
    .where('id', req.body.id) // find correct record based on id
    .del() // delete the record
    .then(() => {
      // Send a success message in response
      res.json({ message: `Arnia ${req.body.id} cancellato.` })
    })
    .catch(err => {
      // Send a error message in response
      res.json({ message: `There was an error deleting ${req.body.id} arnia: ${err}` })
    })
}

// Remove all Apiario on the list
exports.arnieReset = async (req, res) => {
  // Remove all books from database
  knex
    .select('*') // select all records
    .from('arnia') // from 'books' table
    .truncate() // remove the selection
    .then(() => {
      // Send a success message in response
      res.json({ message: 'Lista delle arnie cancellate.' })
    })
    .catch(err => {
      // Send a error message in response
      res.json({ message: `Ci sono stati errori nella cancellazione della lista delle arnie: ${err}.` })
    })
}