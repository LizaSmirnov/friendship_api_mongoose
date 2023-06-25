// const connection = require('../config/connection');
// const { User, Thought, Reaction } = require('../models');

// //log error message if connection error
// connection.on('error', (err) => err);

// //deletes the collections if they exist
// connection.once('open', async () => {
//   console.log('connected to database');

//   let usersCheck = await connection.db.listCollections({name: 'users'}).toArray();
//   if(usersCheck.length){
//     await connection.dropCollection('users');
//   }

//   let thoughtsCheck = await connection.db.listCollections({name: 'thoughts'}).toArray();
//   if(thoughtsCheck.length){
//     await connection.dropCollection('thoughts');
//   }

//   let reactionsCheck = await connection.db.listCollections({name: 'reactions'}).toArray();
//   if(usersCheck.length){
//     await connection.dropCollection('reactions');
//   }
//   // await User.deleteMany({});
//   // await Thought.deleteMany({});
//   // await Reaction.deleteMany({});

// //create empty array to hold students 
//   const users = [];

//   //loop 10 times -- add users to the user array
//   for (let i = 0; i < 10; i++) {
//     const user = await User.create({
//       email:`john_${i}@mail.com`, // Provide a valid email address
//       username: `john_${i}`, // Provide a username
//     });

//     const thought = await Thought.create({
//       thoughtText: 'stuff',
//       username: 'plate', // Provide a username
//       email: 'jacob@mail.com',
//     });

//     const reaction = await Reaction.create({
//       reactionBody: 'thats cool',
//       username: 'username',
//     });

//     // users.push(user._id);
//   }

//   // await Thought.updateMany({}, { user: users });
//   // await Reaction.updateMany({}, { user: users });

//   console.log('all done!');
//   process.exit(0);
// });
