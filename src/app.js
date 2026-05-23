const express = require("express")

const app = express();

/*app.use("/user", (req, res) => {
    //Route handler
    //if will not handle request  here it will go ininfinte loop kind of thind and will not get response from server
})*/

app.use("/user", (req, res) => {
    res.send("Hello from user route")
    next();
},
(req, res) => {
    res.send("Hello from user route 2")
    next();
},
(req, res) => {
    res.send("Hello from user route 3")
    next();
},
(req, res) => {
    res.send("Hello from user route 4")
    next();
},
(req, res) => {
    res.send("Hello from user route 5")
}
)

app.listen(3000, () => {
    console.log("server is successfully listining on port 3000")
})
