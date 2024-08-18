// Importing Thought and User models
const { Thought, User } = require('../models');

module.exports = {
    // Gets all thoughts
    async getAllThoughts(req, res) {
        try {
            const thoughts = await Thought.find();
            res.status(200).json(thoughts);
        } catch (error) {
            res.status(500).json({error, message: 'Internal server error.' });
            console.error(error);
        }
    },

    // Gets single thought
    async getOneThought(req, res) {
        try {
            const thought = await Thought.findOne(
                { _id: req.params.thoughtId }
            )
            .select('-__v');

            if (!thought) {
                return res.status(404).json({ message: 'Sorry, no thought found with that ID.' });
            }
            res.status(200).json(thought);
        } catch (error) {
            res.status(500).json({ error, message: 'Internal server error.' });
            console.error(error);
        }
    },

    // Creates a new thought
    async newThought(req, res) {
        try {
            // Finds user_id based on username to assign thought to correct user
            const user = await User.findOne(
                { username: req.body.username }
            );
            if (!user) {
                return res.status(404).json({ message: 'Sorry, no user found with that username' });
            }
            const thought = await Thought.create(req.body);
            // Finds associated user and update user document with created thought
            await User.findByIdAndUpdate( 
                user._id , 
                { $addToSet: { thoughts: thought._id }}, 
                { new: true }
            );

            res.status(200).json({thought, message: 'Success! Thought created!' });
        } catch (error) {
            res.status(500).json({ error, message: 'Internal server error.' });
            console.error(error);
        }
    },

    // Updates a thought
    async updateThought(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId}, 
                req.body, 
                { new: true }
            );
            if (!thought) {
                res.status(404).json({ message: 'Sorry, no thought found with that ID.' });
            }
            res.status(200).json({thought, message: 'Success! Thought updated successfully!' });
        } catch (error) {
            res.status(500).json({error, message: 'Internal server error.' });
            console.error(error);
        }
    },

    // Deletes a thought
    async deleteThought(req, res) {
        try {
            const thought = await Thought.findOneAndDelete(
                { _id: req.params.thoughtId }
            );
            if (!thought) {
                return res.status(404).json({ message: 'Sorry, no thought found with that ID.' });
            }
            // Finds the user to remove the thought ID from their thought array
            await User.findOneAndUpdate(
                { username: thought.username }, 
                { $pull: {thoughts: req.params.thoughtId }}, 
                { new: true }
            );

            res.status(200).json({ message: 'Success! Thought successfully deleted!' });
        } catch (error) {
            res.status(500).json({ error, message: 'Internal server error.' });
            console.error(error);
        }
    },

    // Creates a reaction
    async newReaction(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId }, 
                { $addToSet: { reactions: req.body }}, 
                { new: true }
            );
            if (!thought) {
                return res.status(404).json({ message: 'Sorry, no thought found with that ID.' });
            }
            res.status(200).json({ thought, message: 'Success! Reaction added successfully!' });
        } catch(error) {
            res.status(500).json({ error, message: 'Internal server error.' });
            console.error(error);
        }
    },
    // Deletes a reaction
    async deleteReaction(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId }, 
                {$pull: { reactions: {_id: req.params.reactionId}}}, 
                { new: true }
            );
            if (!thought) {
                return res.status(404).json({ message: 'Sorry, no thought found with that ID.' });
            }
            res.status(200).json({ thought, message: 'Success! Reaction successfully deleted!' });
        } catch (error) {
            res.status(500).json({ error, message: 'Internal server error.' });
            console.error(error);
        }
    }
};