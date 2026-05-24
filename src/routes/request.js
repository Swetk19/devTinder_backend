const express = require("express")
const { userAuth } = require("../middlewares/auth")
const requestRouter = express.Router();
const ConnectionRequest = require("../models/connectionRequest")
const User = require("../models/user")    

requestRouter.post("/request/send/:status/:toUserId", userAuth, async (req, res) => {
    try{
        const fromUserId = req.user._id;
        const toUserId = req.params.toUserId;
        const status = req.params.status;

        const allowedStatus = ["ignored", "interested"]
        if(!allowedStatus.includes(status)){
            return res.status(400).json({ message: `Invalid status type: ${status}` });
        }

        const toUser = await User.findById(toUserId);
        if(!toUser){
            return res.status(404).json({ message: "User not found" })
        }

        const existingConnectionRequest = await ConnectionRequest.findOne({
            $or: [
                { fromUserId, toUserId },
                { fromUserId: toUserId, toUserId: fromUserId },
            ],
        });

        if(existingConnectionRequest){
            return res.status(400).json({ message: "Connection request already exists between these users" })
        }

        const connectionRequest = new ConnectionRequest({
            fromUserId,
            toUserId,
            status,
        });

        const data = await connectionRequest.save();

        // ✅ Dynamic message based on status
        const statusMessages = {
            interested: `💚 ${req.user.firstName} is interested in ${toUser.firstName}!`,
            ignored: `👋 ${req.user.firstName} has ignored ${toUser.firstName}.`,
        };

        res.json({ message: statusMessages[status], data });
    }
    catch(error){
        res.status(400).send("ERROR : " + error.message);
    }
})

module.exports = requestRouter;