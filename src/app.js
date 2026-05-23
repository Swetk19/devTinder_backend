const express = require("express")
const connectDatabase = require("./config/database")
const app = express();


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


