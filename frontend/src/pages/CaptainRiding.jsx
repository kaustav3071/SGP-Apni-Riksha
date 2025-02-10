import React, { useState } from "react";
import Map from "../assets/UberAuto-Delhi.jpg"; // Replace with live map source
import APNI1 from "../assets/APNI1.png"; // Replace with logo
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const CaptainRiding = () => {
    const navigate = useNavigate();
    const [showPopup, setShowPopup] = useState(false);

    return (
        <div className="h-screen flex flex-col bg-yellow-400 relative">
            {/* Logo (Top-Left) */}
            <img src={APNI1} alt="Logo" className="w-16 absolute top-3 left-4 z-10" />

            {/* Logout Button (Top-Right) */}
            <button
                onClick={() => navigate("/saarthi-login")}
                className="absolute top-3 right-4 z-20 bg-white bg-opacity-80 p-2 rounded-full shadow-md hover:bg-red-500 transition duration-300"
            >
                <img
                    src="https://img.icons8.com/bubbles/100/exit.png"
                    alt="Logout"
                    className="w-12"
                />
            </button>

            {/* Map Section */}
            <div className="w-full h-[80%] relative">
                <img src={Map} alt="Map" className="w-full h-full object-cover rounded-b-lg shadow-md" />
            </div>

            {/* Ride Details */}
            <div className="bg-green-200 p-4 rounded-t-3xl shadow-md py-6 text-center relative">
                <p className="text-lg font-semibold"> 🛣️ 4KM away..</p>
                
                {/* Ride Completed Button */}
                <button 
                    onClick={() => setShowPopup(true)}
                    className="w-full bg-blue-600 text-white py-5 font-semibold text-lg shadow-lg rounded-lg transition-all hover:bg-blue-400 hover:scale-105 active:scale-95"
                >
                    ✅ Completed Ride
                </button>
            </div>

            {/* Ride Completion Popup */}
            {showPopup && (
                <motion.div 
                    initial={{ scale: 0.9 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0.9 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-end"
                >
                    <div className="w-full bg-white p-6 rounded-t-3xl shadow-xl text-center">
                        <h2 className="text-2xl font-bold text-green-600">🎉 Ride Successfully Completed!</h2>
                        <div className="flex justify-center space-x-6 mt-4">
                            <div className="w-24 h-24 bg-yellow-400 rounded-full flex flex-col items-center justify-center shadow-md">
                                <p className="font-bold text-lg text-blue-600">₹ 50</p>
                                <p className="text-semibold text-gray-500">EST Fare</p>
                            </div>
                            <div className="w-24 h-24 bg-yellow-400 rounded-full flex flex-col items-center justify-center shadow-md">
                                <p className="font-bold text-lg text-blue-600">4KM</p>
                                <p className="text-semibold text-gray-500">Distance</p>
                            </div>
                            <div className="w-24 h-24 bg-yellow-400 rounded-full flex flex-col items-center justify-center shadow-md">
                                <p className="font-bold text-lg text-blue-600">15 mins</p>
                                <p className="text-semibold text-gray-500">EST Time</p>
                            </div>
                        </div>
                        <button 
                            onClick={() => navigate("/saarthi-home")}
                            className="w-full bg-red-500 text-white py-4 font-semibold text-lg shadow-lg rounded-lg mt-4 hover:bg-red-600 transition-all"
                        >
                            Drop Off
                        </button>
                    </div>
                </motion.div>
            )}
        </div>
    );
};

export default CaptainRiding;
