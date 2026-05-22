const express = require("express")

const app = express();

//HTTP REQUEST HANDLERS

app.get("/user", (req, res) => {
    res.send("Hello from user")
})

app.post("/user", (req, res) => {
    res.send("Hello from user post")
})

app.put("/user", (req, res) => {
    res.send("Hello from user put")
})

app.delete("/user", (req, res) => {
    res.send("Hello from user delete")
})


/*app.use("/test",(req, res) => { //app.use() is a method to register middleware and the function I pass inside it is the request handler.
    res.send("Hello from server") //myserver will only respond to /test
})

app.use("/test/2", (req, res) => {
    res.send("hello from test 2")
})

app.use("/user", (req, res) => {
    res.send("Hello from user")
})*/

app.use("/", (req, res) => { //This will match all the routes because it is the root route. So if I send a request to /test, it will also match this route and send the response "hello from server". If I send a request to /user, it will also match this route and send the response "hello from server". So this route will override all the other routes. So I should use this route at the end of all the routes.
    res.send("hello from server")
})


app.listen(3000, () => {
    console.log("server is successfully listining on port 3000")
})
