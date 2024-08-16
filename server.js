// Importing express.js, connection to database, and routes
const express = require('express');
const db = require('./config/connection');
const routes = require('./routes');

// Setting port number and creating instance of express/initializing express
const PORT = process.env.PORT || 3001;
const app = express();

// Setting up middleware to parse incoming request bodies in urlencoded format and in JSON format
// Incorporating routes for express
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

// Setting up listener for when database is successfully opened 
// Then starts the API server and listens on specified PORT
db.once('open', () => {
    app.listen(PORT, () => {
        console.log(`API Server running on port ${PORT}.`);
    });
});