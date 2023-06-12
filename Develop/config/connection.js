const { connect, connection } = require('mongoose');


const connectionString =
  process.env.MONGODB_URI || 'mongodb://127.0.0.1/friendsDB';

  connect(connectionString);
  
module.exports = connection;
