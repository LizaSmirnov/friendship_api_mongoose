const connection = require('../config/connection');
const { User, Thoughts, Reaction } = require('../models');

connection.once('open', async () => {
    console.log('connected to database');
    await User.deleteMany({});
    await Thoughts.deleteMany({});
    await Reaction.deleteMany({});

    const user = [];

    for (let i = 0; i < 10; i++) {
        const thoughts = await Thoughts.create({
            thoughtText: faker.lorem.words(Math.round(Math.random() * 20) + 1),
            username: faker.internet.userName(),
        });

        const reaction = await Reaction.create({
            reactionBody: faker.lorem.words(Math.round(Math.random() * 20) + 1),
            username: faker.internet.userName(),
            
        });
        user.push({ thoughts: thoughts._id, reaction: reaction._id });
    }    
    
    await User.create(user);
    console.log('all done!');
    process.exit(0);
    
});
