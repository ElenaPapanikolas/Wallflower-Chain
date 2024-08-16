// Importing Schema object from mongoose and importing moment for date formatting
const { Schema } = require('mongoose');
const moment = require('moment');

// Creating reactionSchema
const reactionSchema = new Schema(
    {
        reactionBody: { type: String, required: true, maxLength: [280] },
        username: { type: String, required: true },
        createdAt: { type: Date, default: Date.now },
    }, 
    {
        toJSON: {
            virtuals: true, // Virtual properties on the schema will be included when schema is converted to JSON
        },
        id: false, // Mongoose will not automatically create an id field for each document
    }
);

// Virtual that calculates and returns a formatted timestamp based on the createAt field
reactionSchema
    .virtual('timestampFormat')
    .get(function () {
        return moment(this.createdAt).format('MM/DD/YYYY');
    });

// Exporting reactionSchema    
module.exports = reactionSchema;