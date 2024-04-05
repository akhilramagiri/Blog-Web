const mongoose = require('mongoose');
const connectDB = async() => {
    try {
        //By default, Mongoose uses strict mode for queries, which means that if you try to query a MongoDB collection using a field that hasn't been defined in the schema, Mongoose will throw an error.
        // Setting strictQuery to false disables this behavior, 
        // allowing you to query using fields that are not explicitly defined in the schema without encountering errors. 
        // This can be useful in situations where you have dynamic data or need more flexibility in your queries.
        //  However, it also means that you need to be careful about the consistency and structure of your data, 
        //  as you won't get validation errors for queries using undefined fields.
        mongoose.set('strictQuery',false);
        const conn = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`Database connected: ${conn.connection.host}`);
    }catch (error) {
        console.log(error);
    }
}

1 //if we don't export we won't be able to use it

module.exports = connectDB;