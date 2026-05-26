const express = require("express")
const {validateSignupData} = require("../utils/validation")
const User = require("../models/user")
const bcrypt = require("bcrypt")
const authRouter = express.Router();


authRouter.post("/signup", async(req, res) => {
    try{
        validateSignupData(req);
        const {firstName, lastName, emailId, password} = req.body;

        const hashedPassword = await bcrypt.hash(password, 10)

        const user = new User({
            firstName, lastName, emailId, password: hashedPassword
        })
        const savedUser = await user.save()
        const token = await savedUser.getJWT()

        res.cookie("token", token, {
            expires: new Date(Date.now() + 8 * 3600000)
        });
        
        res.json({message: "User Added Successfully!", data:savedUser })
    }
    catch(err){
        res.status(400).send("Error : " + err.message) 
    }   
});

authRouter.post("/login", async(req, res) => {
    try{
        const {emailId, password} = req.body;
        const user = await User.findOne({emailId})
        if(!user){
            throw new Error("Invalid credential")
        }
        const isPasswordValid = await user.validatePassword(password);
        if(!isPasswordValid){
            throw new Error("Invalid credential")
        }
        const token = await user.getJWT();
        res.cookie("token", token, {
            expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
        });
        res.json(user)
    }
    catch(err){
        res.status(400).send("Error : " + err.message)
    }
})

authRouter.post("/logout", async(req, res) => {
    res.cookie("token", null, {
    expires: new Date(Date.now()),
    });
    res.send("logout successfull")
});

module.exports = authRouter;