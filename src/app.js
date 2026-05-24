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
const { userAuth } = require("./middlewares/auth")

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
        const isPasswordValid = await user.validatePassword(password);
        if(isPasswordValid){
            const token = await user.getJWT();

            //Add token to cookie and send the response back to the user
            res.cookie("token", token, {
                expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 1 day
            });
            res.send("login successfull")
        }else{
            throw new Error("Invalid credential")
        }
    }
    catch(err){
        res.status(400).send("Error : " + err.message)
    }
})

app.get("/profile", userAuth, async (req, res) => {
    try {
        const user = req.user;
        res.send(user);
    } catch (err) {
        res.status(400).send("ERROR : " + err.message);
    }
});

app.post("/sendConnectionRequest", userAuth, async (req, res) => {
    const user = req.user;
    console.log("sending a connection request");
    res.send(user.firstName + "send the connection request")
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