// Importing Schema and model objects from mongoose, importing Reaction schema, importing moment for date formatting
const { Schema, model } = require('mongoose');
const Reaction = require('./Reaction');
const moment = require('moment');

// Creating thoughtSchema
const thoughtSchema = new Schema(
    {
        thoughtText: { type: String, required: true, minLength: [1], maxLength: [280] },
        createdAt: { type: Date, default: Date.now },
        username: { type: String, required: true },
        reactions: [Reaction],
    },
    {
        toJSON: {
            virtuals: true, // Virtual properties on the schema will be included when schema is converted to JSON
        },
        id: false, // Mongoose will not automatically create an id field for each document
    }
);

// Virtual that calculates and returns a formatted timestamp based on the createAt field
thoughtSchema
    .virtual('timestampFormat')
    .get(function() {
        return moment(this.createdAt).format('MM/DD/YYYY');
});

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