const validator = require("validator")

const validateSignupData = (req) => {
    const {firstName, lastName, emailId, password} = req.body;
    if(!firstName || !lastName){
        throw new Error("First name and last name are required")
    }else if(!validator.isEmail(emailId)){
        throw new Error("Invalid email address")
    }else if(!validator.isStrongPassword(password)){
        throw new Error("Enter a strong password")
    }
}

const validateEditProfileData = (req) => {
    const allowedEditFields = [
        "firstName",
        "lastName",
        "emailId",
        "gender",
        "age",
        "about",
        "skills",
        "photoUrl"
    ];

    const isEditAllowed = Object.keys(req.body).every((field) => allowedEditFields.includes(field));
    return isEditAllowed;
};

module.exports = {validateSignupData, validateEditProfileData}