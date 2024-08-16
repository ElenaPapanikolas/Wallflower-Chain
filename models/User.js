// Importing Schema and model objects from mongoose 
const { Schema, model } = require('mongoose');

// Creating userSchema
const userSchema = new Schema(
    {
        username: { type: String, required: true, unique: true, trim: true },
        email: { type: String, required: true, unique: true, match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email address']},
        thoughts: [ { type: Schema.Types.ObjectId, ref: 'thought'},],
        friends: [{ type: Schema.Types.ObjectId, ref: 'user'},],
    },
    {
        toJSON: {
            virtuals: true, // Virtual properties on the schema will be included when schema is converted to JSON
        },
        id: false, // Mongoose will not automatically create an id field for each document
    }
);

// Virtual that gets length of friends array to return friend count
userSchema
    .virtual('friendCount')
    .get(function () {
        return this.friends.length;
    });

// Creating a User model that will interact with the MongoDB collection 'user' based on the defined userSchema
const User = model('user', userSchema);

// Exporting User
module.exports = User;