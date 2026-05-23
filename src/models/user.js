const mongoose = require('mongoose');
 
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
    },
    emailId: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
    },
    age:{
        type: Number,
        min: 18,
    },
    gender:{
        type: String,
        validate(value){
            if(!["male", "female", "other"].includes(value)){
                throw new Error("Invalid gender")
            }
        }
    },
    photoUrl:{
        type: String,
    },
    about:{
        type: String,
        default: "Hey there! I'm using DevTinder.",
    },
    skills:{
        type: [String],
    },
},
{ timestamps: true }
);

module.exports = mongoose.model("User", userSchema);