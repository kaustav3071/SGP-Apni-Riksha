import React, { useState } from "react";
import { motion } from "framer-motion";
import APNI1 from "../assets/APNI1.png";
import Map from "../assets/UberAuto-Delhi.jpg";

const Home = () => {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div className="h-screen flex flex-col bg-yellow-100" style={{ fontFamily: 'sans-serif' }}>
            {/* Logo at the top-left */}
            <img src={APNI1} alt="Logo" className="w-16 absolute top-5 left-5 z-10" />

            {/* Map taking up the top section (only visible when not expanded) */}
            {!isExpanded && (
                <div className="w-full h-2/3 relative">
                    <img src={Map} alt="Map" className="w-full h-full object-cover rounded-b-lg shadow-md" />
                </div>
            )}

            {/* Input section with animation */}
            <motion.div 
                initial={{ height: "33%", y: 0 }} 
                animate={{ height: isExpanded ? "100%" : "33%", y: isExpanded ? "-66%" : "0%" }} 
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="bg-green-100 p-6 rounded-t-lg text-center shadow-lg w-full absolute bottom-0"
                onClick={() => setIsExpanded(true)}
            >    
                <h4 className="text-lg font-semibold">{isExpanded ? "Enter Trip Details" : "Find a Trip"}</h4>
                <form onClick={(e) => e.stopPropagation()}>
                    <input 
                        type="text" 
                        placeholder="Enter Pickup Location" 
                        className="w-full p-3 my-3 border border-gray-300 rounded-lg"
                    />
                    <input 
                        type="text" 
                        placeholder="Enter Drop Location" 
                        className="w-full p-3 my-3 border border-gray-300 rounded-lg"
                    />
                    {isExpanded && (
                        <button 
                            type="button" 
                            className="w-full p-3 bg-blue-600 text-white rounded-lg mt-4"
                            onClick={() => setIsExpanded(false)}
                        >
                            Confirm
                        </button>
                    )}
                </form>
            </motion.div>
        </div>
    );
}

export default Home;
