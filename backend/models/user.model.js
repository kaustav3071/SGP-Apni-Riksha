const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const BlacklistToken = require("./blackListToken.model");

// User Schema with validation rules for the user object properties 


const userSchema = new mongoose.Schema({
    fullName : {
        firstName : {
            type : String,
            required : "First name is required",
            minlength : [3, "First name should be at least 3 characters long"]
        },
        lastName : {
            type : String,
            minlength : [3, "Last name should be at least 3 characters long"]
        }
    },
    email : {
        type : String,
        required : "Email is required",
        unique : true,
        match : [/.+\@.+\..+/, "Please enter a valid email"],
        minlength : [5, "Email should be at least 5 characters long"]
    },
    password : {
        type : String,
        required : "Password is required",
        select : false,
    },
    socketId : {
        type : String
    },
});

userSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({_id : this._id}, process.env.JWT_SECRET, {expiresIn : "24h"});
    return token;
};
userSchema.methods.comparePassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};
userSchema.statics.hashPassword = async function(plainPassword) {
    return await bcrypt.hash(plainPassword, 10);
};

// Check if token is blacklisted
userSchema.statics.isTokenBlacklisted = async function (token) {
    try {
        const blacklisted = await BlacklistToken.findOne({ token });
        return blacklisted ? true : false;
    } catch (error) {
        console.error("Error checking blacklist:", error);
        return false; // Assume token is not blacklisted if an error occurs
    }
};


const user = mongoose.model("User", userSchema);

module.exports = user;

