const connection = require('../config/connection');
const { User, Thought } = require('../models');

connection.on('error', (err) => err);

connection.once('open', async () => {
    console.log('connected');
      // Delete the collections if they exist
      let userCheck  = await connection.db.listCollections({ name: 'user' }).toArray();
      if (userCheck.length) {
        await connection.dropCollection('user');
      }
  
      let thoughtCheck = await connection.db.listCollections({ name: 'thought' }).toArray();
      if (thoughtCheck.length) {
        await connection.dropCollection('thought');
      }


        const users = await User.find();
        const thoughts = await Thought.find();

        console.log('Collections created:', users, thoughts);

     


    });     