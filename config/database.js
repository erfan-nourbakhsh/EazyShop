const mongoose = require("mongoose"); 
// Import the Mongoose library, which is used to interact with MongoDB in Node.js

const connectDatabase = () => { 
  // Define a function named connectDatabase that will handle connecting to MongoDB

  mongoose
    .connect('mongodb://localhost:27017', { 
      // Use Mongoose to connect to MongoDB at the given URI (local instance on default port 27017)
      useNewUrlParser: true, 
      // Option to use the new MongoDB connection string parser instead of the deprecated one
      useUnifiedTopology: true, 
      // Option to opt in to the MongoDB driver's new connection management engine
    })
    .then((con) => { 
      // After a successful connection, execute this function with the connection object 'con'
      console.log(
        `MongoDB database connected to the host: ${con.connection.host}`
      ); 
      // Log a message confirming the successful connection and display the host
    });
};

module.exports = connectDatabase; 
// Export the connectDatabase function so it can be imported and used in other files
