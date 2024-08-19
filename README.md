 
# Wallflower-Chain
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Description
Wallflower-Chain is an API for a social network application where users can share their thoughts, react to friends’ thoughts, and create a friend list using Express.js for routing, a MongoDB database, and the Mongoose ODM.

## Table of Contents
* [Installation](#installation)
* [Usage](#usage)
* [License](#license)
* [Contributing](#contributing)
* [Credits](#credits)
* [Tests](#tests)
* [Questions](#questions)

## Installation
Run the command `npm i`.


## Usage
### Click [here](https://drive.google.com/file/d/1v8eAG0RgGCaU112sIyQsNDB5ZnBWQcp_/view?usp=sharing) to see the video walkthrough demo.
Since this is a back-end application you will need to clone the repository to your local machine and run `npm i` to install all dependencies. Also enure MongoDB is installed and run the script `npm run seed`, found in the package.json file, to connect to your local MongoDB database and create the needed collections for the application. To start the application run the command `npm start` and then navigate to an API testing tool, like Insomnia.

Use the following endpoints with the following routes to interact with the application: 
### Users:
* `/api/users` GET route to display all users and POST route to create a new user.
* `/api/users/:userId` GET route to display a single user by id, PUT route to update a user by id, and DELETE route to delete a user by id.
### Friends:
* `/api/users/:userId/friends/:friendId` POST route to add a friend and DELETE route to delete a friend.
### Thoughts:
* `/api/thoughts` GET route to display all thoughts and POST route to create a new thought.
* `/api/thoughts/:thoughtId` GET route to display a single thought by id, PUT route to update a thought by id, and DELETE route to delete a thought by id.
### Reactions:
* `/api/thoughts/:thoughtId/reactions` POST route to create a new reaction.
* `/api/thoughts/:thoughtId/reactions/:reactionId` DELETE route to delete a single reaction by id.

![Screenshot of app in Insomnia](/assets/images/screenshot1.png)
![Screenshot of app in Insomnia](/assets/images/screenshot2.png)


## License 
This project is operating under the MIT license. For more detailed information about the license, please click [here](https://opensource.org/licenses/MIT).

## Contributing 
Please contact me with any contributions.

## Credits
N/A

## Tests
N/A

## Questions 
Contact me with any questions regarding this project:

GitHub: [ElenaPapanikolas](https://github.com/ElenaPapanikolas)

Email: epapanikolas@hotmail.com