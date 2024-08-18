// Importing User and Thought models
const { User, Thought } = require('../models');

module.exports = {
    // Gets all users
    async getAllUsers(req, res) {
        try {
            const users = await User.find();
            res.status(200).json(users);
        } catch (error) {
            res.status(500).json({error, message: 'Internal server error.' });
            console.error(error);
        }
    },
    
    // Gets a single user
    async getOneUser(req, res) {
        try {
            const user = await User.findOne(
                { _id: req.params.userId }
            )
            .select('-__v');

            if (!user) {
                return res.status(404).json({ message: 'Sorry, cannot find user with that ID.' });
            }
            res.status(200).json(user);
        } catch (error) {
            res.status(500).json({error, message: 'Internal server error.' });
            console.error(error);
        }
    },

    // Creates a new user
    async newUser(req, res) {
        try {
            const user = await User.create(req.body);
            res.status(200).json({user, message: 'Success! User created successfully!' });
        } catch (error) {
            res.status(500).json({error, message: 'Internal server error.' });
            console.error(error);
        }
    },

    // Updates existing user
    async updateUser(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                {_id: req.params.userId},
                req.body,
                { new: true }
            );
            if (!user) {
                return res.status(404).json({ message: 'Sorry, cannot find user with that ID.' });
            }
            res.status(200).json({ user, message: 'Success! User updated successfully!' });
        } catch (error) {
            res.status(500).json({error, message: 'Internal server error.' });
            console.error(error);
        }
    },

    // Deletes user and associated thoughts
    async deleteUser(req, res) {
        try {
            const user = await User.findOneAndDelete(
                { _id: req.params.userId }
            );
            if (!user) {
                return res.status(404).json({ message: 'Sorry, cannot find user with that ID.' });
            }
            // Checking for thought associated with user and deleted them
            const { userThoughts } = await Thought.deleteMany(
                { username: user.username }
            );
            // Custom success message if user has no thoughts
            if (userThoughts === 0) {
                return res.status(200).json({ message: 'Success! User successfully deleted and no thoughts found to delete!' });
            }
            res.status(200).json({ message: 'Success! User successfully deleted and all associated thoughts deleted!' });
        } catch (error) {
            res.status(500).json({ error, message: 'Internal server error.' });
            console.error(error);
        }
    },

    // Adds a friend
    async addFriend(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId }, 
                { $addToSet: {friends: req.params.friendId }}, 
                { new: true }
            );
            if (!user) {
                return res.status(404).json({ message: 'Sorry, cannot find user with that ID.' });
            }
            res.status(200).json({user, message: 'Success! Friend added!' });
        } catch (error) {
            res.status(500).json({ error, message: 'Internal server error.' });
            console.error(error);
        }
    },

    // Deletes a friend
    async deleteFriend(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId }, 
                { $pull: {friends: req.params.friendId }}, 
                { new: true }
            );
            if (!user) {
                return res.status(404).json({ message: 'Sorry, cannot find user with that ID.' });
            }
            res.status(200).json({user, message: 'Success! Friend deleted!' });
        } catch (error) {
            res.status(500).json({ error, message: 'Internal server error.' });
            console.error(error);
        }
    }
};