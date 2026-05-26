const express = require("express")
require('dotenv').config();
const connectDatabase = require("./config/database")
const app = express();
const cookieParser = require("cookie-parser")
//const jwt = require("jsonwebtoken")

const authRouter = require("./routes/auth")
const profileRouter = require("./routes/profile")
const requestRouter = require("./routes/request")
const userRouter = require("./routes/user")
const cors = require("cors")

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}))
app.use(cookieParser())
app.use(express.json())
app.use("/api", authRouter)
app.use("/api", profileRouter)
app.use("/api", requestRouter)
app.use("/api", userRouter)
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