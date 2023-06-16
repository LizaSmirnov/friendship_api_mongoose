const connection = require('../config/connection');
const { User, Thought, Reaction } = require('../models');

connection.once('open', async () => {
  console.log('connected to database');
  await User.deleteMany({});
  await Thought.deleteMany({});
  await Reaction.deleteMany({});

  const users = [];

  for (let i = 0; i < 10; i++) {
    const user = await User.create({
      email: 'jacob@mail.com', // Provide a valid email address
      username: 'plate', // Provide a username
    });

    const thought = await Thought.create({
      thoughtText: 'stuff',
      username: 'plate', // Provide a username
      email: 'jacob@mail.com',
    });

    const reaction = await Reaction.create({
      reactionBody: 'thats cool',
      username: 'username',
    });

    users.push(user._id);
  }

  await Thought.updateMany({}, { user: users });
  await Reaction.updateMany({}, { user: users });

  console.log('all done!');
  process.exit(0);
});
