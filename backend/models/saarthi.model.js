const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


const saarthiSchema = new mongoose.Schema({
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
        type : String,
        default : null,
    },
    status: {
        type: String,
        enum: ['online', 'offline'],
        default: 'offline',
    },
    vehicle: {
        color:{
            type: String,
            required: "Color is required",
            minlength: [3, "Color should be at least 3 characters long"]
        },
        plate:{
            type: String,
            required: "Plate is required",
            minlength: [3, "Plate should be at least 3 characters long"]
        },
        capacity:{
            type: Number,
            required: "Capacity is required",
            min: [1, "Capacity should be at least 1"]
        },
        type:{
            type: String,
            required: "Type is required",
            enum: ['auto'], // Only "auto" is allowed
        }
    },
    location: {
        lastitude:{
            type: Number
        },
        longitude:{
            type: Number
        }
    }
});

saarthiSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({_id : this._id}, process.env.JWT_SECRET, {expiresIn : "24h"});
    return token;
};

saarthiSchema.methods.comparePassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

saarthiSchema.statics.hashPassword = async function(plainPassword) {
    return await bcrypt.hash(plainPassword, 10);
}

const saarthiModel = mongoose.model("Saarthi", saarthiSchema);


module.exports = saarthiModel;