import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const LookingForDriver = ({ ride, onCancel }) => {
    if (!ride) return null;

    useEffect(() => {
        console.log("Searching for a driver...");
        return () => console.log("Stopped searching for a driver.");
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
                    <h2 className="text-xl font-bold text-gray-800 mb-4 text-center">Looking for a Saarthi...</h2>

                    {/* Searching Animation */}
                    <motion.div
                        animate={{ rotate: [0, 360] }} // Rotates smoothly
                        transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                    >
                        <img
                            src="https://img.icons8.com/color/96/auto-rickshaw.png"
                            alt="vehicle"
                            className="w-24 h-24 mb-4"
                        />
                    </motion.div>

                    <p className="text-lg font-semibold">{ride.description}</p>
                    <p className="text-black text-sm mb-2">Estimated arrival: {ride.time} mins</p>
                    <p className="text-green-600 font-bold text-xl">Fare: ₹{ride.price}.00</p>

                    {/* Cancel Ride Button */}
                    <motion.button
                        className="w-full p-4 bg-red-600 text-white rounded-lg mt-6 text-lg font-semibold hover:bg-red-700 transition"
                        whileTap={{ scale: 0.95 }} // Slight animation on press
                        onClick={onCancel}
                    >
                        Cancel Ride
                    </motion.button>
                </motion.div>
            </motion.div>
        </AnimatePresence>
        // <AnimatePresence>
        //             <motion.div
        //                 initial={{ y: "100%" }}
        //                 animate={{ y: 0 }}
        //                 exit={{ y: "100%" }}
        //                 transition={{ duration: 0.5, ease: "easeOut" }}
        //                 className="fixed bottom-0 left-0 w-full bg-white shadow-2xl rounded-t-lg p-6"
        //             >
        //                 <motion.div
        //                     initial={{ scale: 0.9 }}
        //                     animate={{ scale: 1 }}
        //                     exit={{ scale: 0.9 }}
        //                     transition={{ duration: 0.3, ease: "easeInOut" }}
        //                     className="w-full max-w-md bg-white shadow-2xl rounded-lg p-6 relative"
        //                 >
        //                     {/* Meet at Pickup Section */}
        //                     <div className="flex justify-between items-center mb-4">
        //                         <h2 className="text-lg font-bold text-gray-800">Meet at the pickup point</h2>
        //                         <div className="bg-black text-white px-3 py-1 rounded-lg text-sm font-semibold">
        //                             {ride.time} min
        //                         </div>
        //                     </div>
        
        //                     {/* Driver Info Section */}
        //                     <div className="flex items-center mb-4">
        //                         <img
        //                             src="https://img.icons8.com/color/96/auto-rickshaw.png" // Auto image
        //                             alt="Auto"
        //                             className="w-16 h-16 rounded-full mr-7"
        //                         />
        //                         <div>
        //                             <h3 className="text-xl font-bold">{ride.driverName || "Saarthi"}</h3>
        //                             <p className="text-gray-700 font-semibold">{ride.vehicleNumber || "KA15AK00-0"}</p>
        //                             <p className="text-gray-500">{ride.vehicleModel || "Auto Rickshaw"}</p>
        //                             <p className="text-yellow-500 font-bold">⭐ 4.9</p>
        //                         </div>
        //                     </div>
                
        //                     {/* Action Buttons */}
        //                     <div className="flex justify-between">
        //                         <button className="flex flex-col items-center text-blue-600 font-semibold">
        //                             <span className="text-2xl">🛡</span>
        //                             <a href="https://www.uber.com/in/en/ride/how-it-works/india-safety/" target="_blank" rel="noreferrer">
        //                             Safety</a>
        //                         </button>
        //                         <button className="flex flex-col items-center text-blue-600 font-semibold">
        //                             <span className="text-2xl">📍</span> Share my trip
        //                         </button>
        //                         <button
        //                         className="flex flex-col items-center text-blue-600 font-semibold">
        //                         <a href={`tel:${ride.driverPhone || "+918488053035"}`} className="flex flex-col items-center">
        //                             <span className="text-2xl">📞</span> Call driver
        //                         </a>
        //                     </button>

        //                     </div>
        
        //                     {/* Cancel Ride Button */}
        //                     <motion.button
        //                         className="w-full p-4 bg-red-600 text-white rounded-lg mt-6 text-lg font-semibold hover:bg-red-700 transition"
        //                         whileTap={{ scale: 0.95 }}
        //                         onClick={onCancel}
        //                     >
        //                         Cancel Ride
        //                     </motion.button>
        //                 </motion.div>
        //             </motion.div>
        //         </AnimatePresence>
    );
};

export default LookingForDriver;
