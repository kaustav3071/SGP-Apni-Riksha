import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

const RideComplete = ({ onClose }) => {
    const [rating, setRating] = useState(0);
    const navigate = useNavigate(); // Hook for navigation

    const handleRating = (value) => {
        setRating(value);
    };

    const handleSubmit = () => {
        alert(`Thank you for rating us ${rating} stars!`);
        onClose(); // Close the popup
        navigate("/"); // Redirect to the home page
    };

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
                    <h2 className="text-xl font-bold text-gray-800 mb-4 text-center">🎉 Ride Complete!</h2>

                    {/* Ride Details */}
                    <p className="text-lg font-semibold text-gray-800">📍 Pickup: <span className="text-green-600">Uttarsanda Railway Station</span></p>
                    <p className="text-lg font-semibold text-gray-800 mt-2">📍 Destination: <span className="text-blue-600">Anand, Gujarat, India</span></p>
                    <p className="text-lg font-semibold text-gray-800 mt-4">💰 Fare: <span className="text-green-600 font-bold">₹224.00</span></p>

                    {/* Rating Section */}
                    <div className="mt-6">
                        <p className="text-lg font-semibold text-gray-800 mb-2">⭐ Rate Your Ride:</p>
                        <div className="flex gap-2">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                    key={star}
                                    onClick={() => handleRating(star)}
                                    className={`text-3xl ${
                                        star <= rating ? "text-yellow-500" : "text-gray-300"
                                    }`}
                                >
                                    ★
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button
                        onClick={handleSubmit}
                        className="w-full p-4 bg-blue-600 text-white rounded-lg mt-6 text-lg font-semibold hover:bg-blue-700 transition"
                    >
                        Submit Rating
                    </button>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export default RideComplete;