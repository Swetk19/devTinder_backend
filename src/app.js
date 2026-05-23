const express = require("express")
require('dotenv').config();
const connectDatabase = require("./config/database")
const app = express();
const User = require("./models/user")

app.post("/signup", async(req, res) => {
    const user = new User({
        firstName: "sweta",
        lastName: "kumari",
        emailId: "swetaraj821@gmail.com",
        password: "sweta@19",
    })
    await user.save()
    res.send("user added successfully")
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


