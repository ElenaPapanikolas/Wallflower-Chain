// Importing connect function and connection object from mongoose that connects to mongoDB
const { connect, connection } = require('mongoose');

// Connection string that specifies the mongoDB server address and the name of the database to connect to
// Initiating a connection to the mongoDb database
connect('mongodb://127.0.0.1:27017/wallflower-chainDB');

// Exporting the connection object so other parts can import this file and access connection to perform database operations
module.exports = connection;