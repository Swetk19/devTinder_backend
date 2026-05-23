const {mongoose} = require('mongoose');


const connectDatabase = async() => {
    await mongoose.connect("mongodb+srv://swetk31:Dontgiveup@mongominds.exxk9fd.mongodb.net/devTinder");
}

module.exports = connectDatabase;

