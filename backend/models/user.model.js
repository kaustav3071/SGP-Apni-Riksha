const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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
    const token = jwt.sign({_id : this._id}, process.env.JWT_SECRET);
    return token;
};
userSchema.methods.comparePassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};
userSchema.statics.hashPassword = async function(plainPassword) {
    return await bcrypt.hash(plainPassword, 10);
};

const user = mongoose.model("User", userSchema);

module.exports = user;

