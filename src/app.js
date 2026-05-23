const express = require("express")
require('dotenv').config();
const connectDatabase = require("./config/database")
const app = express();
const User = require("./models/user")
const {validateSignupData} = require("./utils/validation")
const bcrypt = require("bcrypt")
app.use(express.json())

app.post("/signup", async(req, res) => {
    //validation of data
    try{
    validateSignupData(req);
    const {firstName, lastName, emailId, password} = req.body;
    //Encrypt the  password

    const hashedPassword = await bcrypt.hash(password, 10)
    console.log("hashedPassword:", hashedPassword) 

    const user = new User({
        firstName, lastName, emailId, password: hashedPassword
    })
        await user.save()
        console.log("Saved user:", user)
        res.send("user added successfully")
    }
    catch(err){
        res.status(400).send("Error : " + err.message) 
    }   
});


//login API
app.post("/login", async(req, res) => {
    try{
        const {emailId, password} = req.body;
        const user = await User.findOne({emailId})
        if(!user){
            throw new Error("Invalid credential")
        }
        const isPasswordValid = await bcrypt.compare(password, user.password)
        if(isPasswordValid){
            res.send("login successfull")
        }else{
            throw new Error("Invalid credential")
        }
    }
    catch(err){
        res.status(400).send("Error : " + err.message)
    }
})




//get user by email
app.get("/user", async(req, res) => {
    const userEmail = req.body.emailId;
    
    try{
        const users = await User.find({emailId: userEmail})
        if(users.length === 0){
            return res.status(404).send("User not found")
        }else{
            res.send(users)
        }
        
    }
    catch(error){
        res.status(400).send("Error fetching user")
    }
})

//Feed API GET/feed :- get all the users from database
app.get("/feed", async(req, res) => {
    try{
        const users = await User.find({})
        res.send(users)
    }
    catch(error){
        res.status(400).send("Error fetching feed") 
    }
})

//delete user by email
app.delete("/user", async(req, res) => {
    const userId = req.body.userId;
    try{
        const deletedUser = await User.findByIdAndDelete(userId)
        res.send("User deleted successfully")
    }
    catch(error){
        res.status(400).send("Error deleting user")
    }
})

//update data of the user
app.patch("/user", async(req, res) => {
    const userId = req.params?.userId;
    const data = req.body
    try{
        const Allowed_Updates = ["about", "gender", "age", "skills"];
        const isUpdateAllowed = Object.keys(data).every((k) => 
            Allowed_Updates.includes(k)
        );
        if(!isUpdateAllowed){
            throw new Error("Update not allowed");
        }
        if(data?.skills.length > 10){
            throw new Error("Skills can not be more than 10")
        }
        const user = await User.findByIdAndUpdate({
            _id: userId},
            data, { new: true, returnDocument: "after", runValidators: true})
        res.send(user)
    }
    catch(error){
        res.status(400).send("UPDATE FAILED:" + error.message)
    }
})

connectDatabase()
.then(() => {
    console.log("Database connected successfully")
    app.listen(3000, () => {
    console.log("server is successfully listening on port 3000")
})
})
.catch((err) => {
    console.log("Error connecting to database: ", err);
})


