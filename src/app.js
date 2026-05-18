const express = require("express")

const app = express();

app.use("/test",(req, res) => { //app.use() is a method to register middleware and the function I pass inside it is the request handler.
    res.send("Hello from server") //myserver will only respond to /test
})

app.use("/user", (req, res) => {
    res.send("Hello from user")
})

app.listen(3000, () => {
    console.log("server is successfully listining on port 3000")
})
