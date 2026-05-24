const express = require("express")
require('dotenv').config();
const connectDatabase = require("./config/database")
const app = express();
const User = require("./models/user")
const {validateSignupData} = require("./utils/validation")
const bcrypt = require("bcrypt")
app.use(express.json())
const cookieParser = require("cookie-parser")
app.use(cookieParser())
const jwt = require("jsonwebtoken")

app.post("/signup", async(req, res) => {
    try{
        validateSignupData(req);
        const {firstName, lastName, emailId, password} = req.body;

        const hashedPassword = await bcrypt.hash(password, 10)

        const user = new User({
            firstName, lastName, emailId, password: hashedPassword
        })
        await user.save()
        res.send("user added successfully")
    }
    catch(err){
        res.status(400).send("Error : " + err.message) 
    }   
});

app.post("/login", async(req, res) => {
    try{
        const {emailId, password} = req.body;
        const user = await User.findOne({emailId})
        if(!user){
            throw new Error("Invalid credential")
        }
        const isPasswordValid = await bcrypt.compare(password, user.password)
        if(isPasswordValid){
            const token = await jwt.sign({_id: user._id}, "DEV@Tinder$790");
            res.cookie("token", token);
            res.send("login successfull")
        }else{
            throw new Error("Invalid credential")
        }
    }
    catch(err){
        res.status(400).send("Error : " + err.message)
    }
})

app.get("/profile", async (req, res) => {
    try {
        const cookies = req.cookies;
        const { token } = cookies;
        if (!token) {
            throw new Error("Invalid Token");
        }
        const decodedMessage = await jwt.verify(token, "DEV@Tinder$790");
        const { _id } = decodedMessage;
        const user = await User.findById(_id);
        if (!user) {
            throw new Error("User does not exist");
        }
        res.send(user);
    } catch (err) {
        res.status(400).send("ERROR : " + err.message);
    }
});

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

app.get("/feed", async(req, res) => {
    try{
        const users = await User.find({})
        res.send(users)
    }
    catch(error){
        res.status(400).send("Error fetching feed") 
    }
})

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
        const user = await User.findByIdAndUpdate(
            {_id: userId},
            data, 
            { new: true, returnDocument: "after", runValidators: true}
        )
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