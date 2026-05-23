const express = require("express")
const {adminAuth, userAuth} = require("./middlewares/auth")

const app = express();

/*app.use("/user", (req, res) => {
    //Route handler
    //if will not handle request  here it will go ininfinte loop kind of thind and will not get response from server
})*/

/*app.use("/user", (req, res, next) => {
    res.send("handling / route")
    next();
})

/* express takes and matches all the routes and goes through the middleware one after other finally it goes 
one after other till it sends the request back
the only job of express is to take the req and give the res as soon as possible and it goes in order to
keep checking these function*/
/*app.get("/user", 
    (req, res, next) => {
        res.send("handling /user rotes")
        next();
    },
    (req, res, next) => {
        next();
    },
    (req, res, next) => {
        res.send("2nd Route handler")
    }
)*/
// handling auth middleware for all GET, POST, PATCH, DELETE requests with middleware
app.use("/admin", adminAuth)

app.get("/user/data", userAuth, (req, res) => {
    res.send("user data sent")
})

app.get("/admin/getAllData", (req, res) => {
    res.send("All data sent")
})

app.get("/deleteAllUser", (req, res) => {
    res.send("All user deleted")
})

/* without using middleware we have to write the same code again and again for each route handler which 
is not a good practice and it is also not efficient as it will take more time to execute the code and 
it will also make the code more complex and hard to maintain*/

/*app.get("/admin/getAllData", (req, res) => {
    //logic of checking if the request is authorized
    const token = "xyz";
    const isAuthorized = token === "xyz";
    if(isAuthorized) {
        res.send("All data sent")
    }else{
        res.status(401).send("Unauthorized")
    }
})*/

/*app.get("/admin/deleteAllUser",(req, res) => {
    const token = "xyxabcd";
    const isAuthorized = token === "xyz";
    if(isAuthorized) {
        res.send("All user deleted")
    }else{
        res.status(401).send("Unauthorized")
    }
})*/

app.listen(3000, () => {
    console.log("server is successfully listening on port 3000")
})
