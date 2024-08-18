// Importing Schema and model objects from mongoose, importing Reaction schema, importing moment for date formatting
const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');
const moment = require('moment');

// Creating thoughtSchema
const thoughtSchema = new Schema(
    {
        thoughtText: { type: String, required: true, minLength: [1], maxLength: [280] },
        createdAt: { type: Date, default: Date.now, get: (date) => moment(date).format('MM/DD/YYYY') },
        username: { type: String, required: true },
        reactions: [reactionSchema],
    },
    {
        toJSON: {
            virtuals: true, // Virtual properties on the schema will be included when schema is converted to JSON
            getters: true, // Will apply any getters defined in schema when document's properties are accessed
        },
        id: false, // Mongoose will not automatically create an id field for each document
    }
);

// Virtual that gets length of reactions array to return reaction count
thoughtSchema
    .virtual('reactionCount')
    .get(function () {
        return this.reactions.length;
    });

// Creating a Thought model that will interact with the MongoDB collection called 'thought' based on the defined thoughtSchema
const Thought = model('thought', thoughtSchema);
    
// Exporting Thought
module.exports = Thought;