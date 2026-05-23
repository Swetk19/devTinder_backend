const adminAuth = (req, res, next) => {
    console.log("admin auth is getting checkede!")
    const token ="xyz";
    const isAuthorized = token  === "xyz";
    if(!isAuthorized) {
        res.status(401).send("Unauthorized")
    }else{
        next();
    }
}

const userAuth = (req, res, next) => {
    const token = "abcxyx";
    const isAuthorized = token === "abc";
    if(!isAuthorized){
        res.status(401).send("Unauthorized")
    }
    else{
        next()
    }
}

module.exports = {
    adminAuth,
    userAuth
}