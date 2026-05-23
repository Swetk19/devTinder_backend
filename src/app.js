const express = require("express")
require('dotenv').config();
const connectDatabase = require("./config/database")
const app = express();
const User = require("./models/user")
app.use(express.json())

app.post("/signup", async(req, res) => {
    //creating new instance of the user model
    const user = new User(req.body)
    try{
        await user.save()
        console.log("Saved user:", user)
        res.send("user added successfully")
    }
    catch(err){
        console.log("Error:", err)
        res.status(400).send("Error adding user")
    }   
});

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


