const {mongoose} = require('mongoose');


const connectDatabase = async() => {
    await mongoose.connect("connection string");
}

module.exports = connectDatabase;

