const express = require("express")
const {adminAuth, userAuth} = require("./middlewares/auth")

const app = express();

app.get("/getUserData", (req, res) => {
    try{
        throw new Error("Something went wrong while fetching user data")
        res.send("User data")
    }catch(err){
        res.status(500).send(err.message)
    }
})

app.use("/",(err, req, res, next) => {
    if(err){
        res.status(500).send(err.message)
    }
})

app.listen(3000, () => {
    console.log("server is successfully listening on port 3000")
})

