const mongoose = require('mongoose');
require('dotenv').config();
const MONGODB_URL = process.env.MONGODB_URL || "mongodb://localhost:27017/my_database";

const connectionToDB = async() => {
    mongoose
    .connect(MONGODB_URL)
    .then((conn) => {
        console.log(`Database connected to ${conn.connection.host}`)
    })
    .catch((error) => {
        console.log(`Error: ${error.message}`);
        process.exit(1);
    })
}

module.exports = connectionToDB;