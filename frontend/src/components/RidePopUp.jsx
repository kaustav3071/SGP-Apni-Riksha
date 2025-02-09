import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ConfirmRidePopUp from "./ConfirmRidePopUp"; // Import Confirmation Popup

const RidePopUp = ({ ride, onAccept, onCancel }) => {
    const [isVisible, setIsVisible] = useState(true);
    const [rideAccepted, setRideAccepted] = useState(false); // Track if ride is accepted

    const handleCancel = () => {
        setIsVisible(false);
        onCancel(); // Call the cancel function from parent (Saarthi_Home)
    };

    const handleAccept = () => {
        setRideAccepted(true); // Show confirmation screen
        onAccept(ride); // Notify parent component
    };

    return (
        <>
            {rideAccepted ? (
                <ConfirmRidePopUp ride={ride} onCancel={onCancel} />
            ) : (
                <AnimatePresence>
                    {isVisible && (
                        <motion.div
                            initial={{ y: "100%" }}
                            animate={{ y: 0 }}
                            exit={{ y: "100%" }}
                            transition={{ duration: 0.5, ease: "easeOut" }}
                            className="fixed bottom-0 left-0 w-full bg-white shadow-2xl rounded-t-lg p-6 pb-6 h-[75vh] max-h-[90vh] overflow-y-auto"
                        >
                            <motion.div
                                initial={{ scale: 0.9 }}
                                animate={{ scale: 1 }}
                                exit={{ scale: 0.9 }}
                                transition={{ duration: 0.3, ease: "easeInOut" }}
                                className="w-full max-w-md mx-auto bg-white shadow-2xl rounded-lg p-6 flex flex-col items-center"
                            >
                                <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">🚖 New Ride Available</h2>
                                <motion.button
                                    className="absolute top-4 right-4 text-gray-600"
                                    whileTap={{ scale: 0.95 }}
                                    onClick={handleCancel}
                                >
                                    ❌
                                </motion.button>

                                <p className="text-lg font-semibold text-gray-900">{ride?.name || "Hardik Pandya"}</p>

                                <div className="w-full flex justify-between gap-4">
                                    <motion.button
                                        className="w-1/2 p-3 bg-green-600 text-white rounded-lg text-lg font-semibold hover:bg-green-700 transition"
                                        whileTap={{ scale: 0.95 }}
                                        onClick={handleAccept}
                                    >
                                        ✅ Accept
                                    </motion.button>
                                    <motion.button
                                        className="w-1/2 p-3 bg-red-600 text-white rounded-lg text-lg font-semibold hover:bg-red-700 transition"
                                        whileTap={{ scale: 0.95 }}
                                        onClick={handleCancel}
                                    >
                                        ❌ Ignore
                                    </motion.button>
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            )}
        </>
    );
};

export default RidePopUp;
