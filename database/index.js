const mongoose = require('mongoose')

const dbUri = 'mongodb+srv://riccoarnold23:riccoarnold23@cluster4.8ymgkdm.mongodb.net/triage?retryWrites=true&w=majority';

const connectDb = async() => {
    try {
        const connect = await mongoose.connect(dbUri);
        console.log(
            "Databse Connected: ",
             connect.connection.host,
             connect.Connection.name
        );
    } catch (err) {
      console.log(err);
      process.exit(1);  
    }
}

module.exports = connectDb;