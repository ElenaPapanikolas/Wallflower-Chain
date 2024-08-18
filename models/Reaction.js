// Importing Schema object from mongoose and importing moment for date formatting
const { Schema } = require('mongoose');
const moment = require('moment');

// Creating reactionSchema
const reactionSchema = new Schema(
    {
        reactionBody: { type: String, required: true, maxLength: [280] },
        username: { type: String, required: true },
        createdAt: { type: Date, default: Date.now, get: (date) => moment(date).format('MM/DD/YYYY') },
    }, 
    {
        toJSON: {
            virtuals: true, // Virtual properties on the schema will be included when schema is converted to JSON
            getters: true,
        },
        id: false, // Mongoose will not automatically create an id field for each document
    }
);

// Exporting reactionSchema    
module.exports = reactionSchema;