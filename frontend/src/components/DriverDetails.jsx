import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const DriverDetails = ({ ride, onCancel }) => {
    if (!ride) return null;

    useEffect(() => {
        console.log("Driver confirmed the ride...");
        return () => console.log("Driver details closed.");
    }, []);

    return (
        <AnimatePresence>
            <motion.div
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "100%" }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="fixed bottom-0 left-0 w-full bg-white shadow-2xl rounded-t-lg p-6"
            >
                <motion.div
                    initial={{ scale: 0.9 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0.9 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="w-full max-w-md bg-white shadow-2xl rounded-lg p-6 relative flex flex-col items-center"
                >
                    <h2 className="text-xl font-bold text-gray-800 mb-4 text-center">🚖 Saarthi Details</h2>

                    {/* Driver Image */}
                    <img
                        src="https://randomuser.me/api/portraits/men/8.jpg"
                        alt="Driver"
                        className="w-24 h-24 rounded-full border-2 border-gray-300 mb-4"
                    />

                    {/* Driver Details */}
                    <p className="text-lg font-semibold text-gray-800">👤 Saarthi Name: <span className="text-green-600">Rohit Sharma</span></p>
                    <p className="text-lg font-semibold text-gray-800 mt-2">🚗 Vehicle No: <span className="text-blue-600">GJ16BC9890</span></p>
                    <p className="text-lg font-semibold text-gray-800 mt-2">🔑 OTP: <span className="text-red-600 font-bold">123456</span></p>

                    {/* Ride Fare */}
                    <p className="text-lg font-semibold text-gray-800 mt-4">💰 Fare: <span className="text-green-600 font-bold">₹{ride.price || 227}.00</span></p>

                    
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export default DriverDetails;