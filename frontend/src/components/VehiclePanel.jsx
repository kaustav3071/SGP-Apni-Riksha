import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const VehiclePanel = ({ ride, onClose, onConfirmRide }) => {
    if (!ride) return null;

    return (
        <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="fixed bottom-0 left-0 w-full bg-white shadow-2xl rounded-t-lg p-6"
        >
            <button className="absolute top-4 right-4 text-gray-600" onClick={onClose}>
                ❌
            </button>

            <h2 className="text-xl font-bold text-gray-800 mb-4 text-center">{ride.type} Details</h2>

            <div className="flex flex-col items-center">
                <img
                    src="https://img.icons8.com/color/96/auto-rickshaw.png"
                    alt="vehicle"
                    className="w-24 h-24 mb-4"
                />
                <p className="text-lg font-semibold">{ride.description}</p>
                <p className="text-black text-sm mb-2">Estimated arrival: {ride.time} mins</p>
                <p className="text-green-600 font-bold text-xl">Fare: ₹{ride.price}.00</p>
            </div>

            <button
                className="w-full block text-center p-4 bg-green-600 text-white rounded-lg mt-6 text-lg font-semibold hover:bg-green-700 transition"
                onClick={onConfirmRide}
            >
                Confirm Ride
            </button> 

        </motion.div>
    );
};

export default VehiclePanel;
