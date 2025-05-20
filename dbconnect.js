require('dotenv').config();
const mongoose = require('mongoose');

// Enable automatic removal of filter fields not in schema
mongoose.set('strictQuery', true);

async function connect() {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            dbName: 'messageBoard',
            serverSelectionTimeoutMS: 5000
        });
    } catch (error) {
        console.error(error);
        throw error;
    }
}

mongoose.connection.on('connected', () => {
    console.log('Successfully connected to database');
});

mongoose.connection.on('error', (error) => {
    console.error('Database connection failed:', error)
});

mongoose.connection.on('disconnected', () => {
    console.log('Database disconnected');
});

module.exports = connect;
