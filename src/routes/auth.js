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
        await user.save()
        res.send("user added successfully")
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

authRouter.post("/logout", async(req, res) => {
    res.cookie("token", null, {
    expires: new Date(Date.now()),
    });
    res.send("logout successfull")
});

module.exports = authRouter;