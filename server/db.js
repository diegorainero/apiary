// bookshelf-app/server/db.js

// Import path module
const path = require('path');

// Get the location of database.sqlite file
const dbPath = path.resolve(__dirname, 'db/apiari.sqlite');

// Create connection to SQLite database
const knex = require('knex')({
	client: 'sqlite3',
	connection: {
		filename: dbPath,
	},
	useNullAsDefault: true,
});

// Create a table in the database called "location"
knex.schema
	// Make sure no "location" table exists
	// before trying to create new
	.hasTable('apiario')
	.then((exists) => {
		if (!exists) {
			// If no "location" table exists
			// create new, with "id", "name", "location",
			// "lat" and "long" columns
			// and use "id" as a primary identification
			// and increment "id" with every new record (book)
			return knex.schema
				.createTable('apiario', (table) => {
					table.increments('id').primary();
					table.string('name');
					table.string('location');
					table.string('lat');
					table.string('long');
				})
				.then(() => {
					// Log success message
					console.log("Table 'location' created");
				})
				.catch((error) => {
					console.error(
						`There was an error creating table: ${error}`
					);
				});
		}
	})
	.then(() => {
		// Log success message
		console.log('done');
	})
	.catch((error) => {
		console.error(`There was an error setting up the database: ${error}`);
	});

knex.schema
	// Make sure no "arnia" table exists
	// before trying to create new
	.hasTable('arnia')
	.then((exists) => {
		if (!exists) {
			// If no "arnia" table exists
			// create new, with "id", "name", "location_id" columns
			// and use "id" as a primary identification
			// and increment "id" with every new record (book)
			return knex.schema
				.createTable('arnia', (table) => {
					table.increments('id').primary();
					table.string('name');
					table.integer('location_id');
				})
				.then(() => {
					// Log success message
					console.log("Table 'arnia' created");
				})
				.catch((error) => {
					console.error(
						`There was an error creating table: ${error}`
					);
				});
		}
	})
	.then(() => {
		// Log success message
		console.log('done');
	})
	.catch((error) => {
		console.error(`There was an error setting up the database: ${error}`);
	});

// Just for debugging purposes:
// Log all data in All table
knex.select('*')
	.from('apiario')
	.then((data) => console.log('data:', data))
	.catch((err) => console.log(err));

knex.select('*')
	.from('arnia')
	.then((data) => console.log('data:', data))
	.catch((err) => console.log(err));

// Export the database
module.exports = knex;
