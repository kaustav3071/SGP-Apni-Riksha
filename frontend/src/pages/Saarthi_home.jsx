import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Map from "../assets/UberAuto-Delhi.jpg"; // Replace with live map source
import APNI1 from "../assets/APNI1.png"; // Replace with logo
import SaarthiDetails from "../components/SaarthiDetails"; // Driver Details
import RidePopUp from "../components/RidePopUp";
import ConfirmRidePopUp from "../components/ConfirmRidePopUp";

const Saarthi_Home = () => {
    const navigate = useNavigate();
    const [ride, setRide] = useState(null); // Stores ride details (if any)
    const [rideAccepted, setRideAccepted] = useState(false); // Track ride acceptance
    const [showRidePopup, setShowRidePopup] = useState(true); // Track popups visibility

    // Function to handle canceling the ride
    const handleCancelRide = () => {
        setShowRidePopup(false); // Close both popups
        setRide(null); // Reset ride details
        setRideAccepted(false); // Reset ride acceptance state
    };

    return (
        <div className="h-screen flex flex-col bg-gray-100 relative">
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
            <div className="w-full h-[55%] relative">
                <img src={Map} alt="Map" className="w-full h-full object-cover rounded-b-lg shadow-md" />
            </div>

            {/* Driver Details */}
            <SaarthiDetails />

            {/* Conditionally Render Popups */}
            {showRidePopup && !rideAccepted && (
                <RidePopUp 
                    ride={ride} 
                    onAccept={(rideData) => { 
                        setRide(rideData); 
                        setRideAccepted(true);
                    }} 
                    onCancel={handleCancelRide} // Pass cancel function
                />
            )}
            
            {showRidePopup && rideAccepted && (
                <ConfirmRidePopUp ride={ride} onCancel={handleCancelRide} /> 
            )}
        </div>
    );
};

export default Saarthi_Home;
