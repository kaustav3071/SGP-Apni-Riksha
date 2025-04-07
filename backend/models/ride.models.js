const mongoose = require('mongoose');


const rideSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    saarthi:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Saarthi'
    },
    pickupLocation:{
        type: String,
        required: true
    },
    dropoffLocation:{
        type: String,
        required: true
    },
    fare:{
        type: Number,
        required: true
    },
    status:{
        type: String,
        enum: ['pending','accepted' , 'ongoing' ,'completed', 'cancelled'],
        default: 'pending'
    },
    duration:{
        type: Number
    },
    distance:{
        type: Number
    },
    paymentid:{
        type: String
    },
    orderId:{
        type: String
    },
    signature:{
        type: String
    },
    otp:{
        type: String,
        select: false,
        required:true
    }
})


module.exports = mongoose.models.Ride || mongoose.model('Ride', rideSchema);