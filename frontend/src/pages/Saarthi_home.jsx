import React, { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Map from "../assets/UberAuto-Delhi.jpg";
import APNI1 from "../assets/APNI1.png";
import SaarthiDetails from "../components/SaarthiDetails";
import RidePopUp from "../components/RidePopUp";
import ConfirmRidePopUp from "../components/ConfirmRidePopUp";
import { SocketContext } from "../context/socketContext";
import { SaarthiDataContext } from "../context/SaarthiContext";
import LiveTracking from "../components/LiveTracking";

const Saarthi_Home = () => {
    const navigate = useNavigate();
    const { saarthi } = useContext(SaarthiDataContext);
    const { sendMessage, receiveMessage } = useContext(SocketContext);

    const [ride, setRide] = useState(null);
    const [rideAccepted, setRideAccepted] = useState(false);
    const [showRidePopup, setShowRidePopup] = useState(false);

    const handleCancelRide = () => {
        setShowRidePopup(false);
        setRide(null);
        setRideAccepted(false);
        if (saarthi && saarthi._id) {
            sendMessage("ride-cancelled", { saarthiId: saarthi._id });
        }
    };

    const handleAcceptRide = (rideData) => {
        setRide(rideData);
        setRideAccepted(true);
        if (saarthi && saarthi._id) {
            sendMessage("ride-accepted", { saarthiId: saarthi._id, rideId: rideData._id });
        }
    };

    useEffect(() => {
        console.log("Saarthi context:", saarthi);
        setShowRidePopup(true);
        if (saarthi && saarthi._id) {
            console.log("Joining Saarthi room with ID:", saarthi._id);
            sendMessage("join", { userType: "saarthi", userId: saarthi._id });

            const updateLocationInterval = setInterval(() => {
                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition((position) => {

                        console.log("saaathi location:",saarthi._id, position.coords.latitude, position.coords.longitude);
                        // Send the updated location to the server
                        const locationData = {
                            saarthiId: saarthi._id,
                            location: {
                                latitude: position.coords.latitude,
                                longitude: position.coords.longitude,
                            },
                        };
                        sendMessage("update-location-saarthi", locationData);
                    });
                }   
            }, 5000); // Update location every 5 seconds

            return () => clearInterval(updateLocationInterval);
        }

        receiveMessage("ride-request", (rideData) => {
            console.log("Incoming ride request:", rideData);
            setRide(rideData);
            setShowRidePopup(true);
        });

        return () => {
            if (saarthi && saarthi._id) {
                sendMessage("leave", { userType: "saarthi", userId: saarthi._id });
            }
        };
    }, [saarthi, sendMessage, receiveMessage]);

    return (
        <div className="h-screen flex flex-col bg-gray-100 relative">
            {/* Header */}
            <img src={APNI1} alt="Logo" className="w-16 absolute top-3 left-4 z-10" />
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
                <LiveTracking />
            </div>

            {/* Saarthi Details */}
            <SaarthiDetails />

            {/* Ride Popups */}
            {showRidePopup && !rideAccepted && (
                <RidePopUp ride={ride} onAccept={handleAcceptRide} onCancel={handleCancelRide} />
            )}
            {showRidePopup && rideAccepted && (
                <ConfirmRidePopUp ride={ride} onCancel={handleCancelRide} />
            )}
        </div>
    );
};

export default Saarthi_Home;