const connection = require('../config/connection');
const { User, Thought } = require('../models');

connection.on('error', (err) => err);

connection.once('open', async () => {
    console.log('connected');

    try {
      // Deletes the collections if they exist
      const collections = await connection.db.listCollections().toArray();

      for (const collection of collections) {
        if (collection.name === 'users' || collection.name === 'thoughts') {
          await connection.db.dropCollection(collection.name);
          console.log(`Dropped collection: ${collection.name}`);
        }
      }
      // Creates collections again after dropping
      await User.create();
      await Thought.create();

      console.log('Collections created:');
    } catch (error) {
      console.error('Error:', error);
    }
    });     