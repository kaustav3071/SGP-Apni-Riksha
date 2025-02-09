import React, { useState } from "react";
import Map from "../assets/UberAuto-Delhi.jpg"; // Replace with your live map source
import APNI1 from "../assets/APNI1.png"; // Replace with your logo source

const Saarthi_Home = () => {
    // Ride Requests Array
    const rideRequests = [
        {
            id: 1,
            customerName: "Esther Berry",
            distance: "2.2 km",
            pickup: "7958 Swift Village",
            dropoff: "105 William St, Chicago, US",
            fare: "$25.00",
            image: "https://randomuser.me/api/portraits/women/68.jpg",
        },
        {
            id: 2,
            customerName: "John Doe",
            distance: "3.5 km",
            pickup: "102 Main Street",
            dropoff: "205 Grand Ave, NY, US",
            fare: "$18.50",
            image: "https://randomuser.me/api/portraits/men/45.jpg",
        }
    ];

    // Track the current ride request
    const [currentRide, setCurrentRide] = useState(0);

    const handleIgnore = () => {
        if (currentRide < rideRequests.length - 1) {
            setCurrentRide(currentRide + 1);
        } else {
            alert("No more ride requests!");
        }
    };

    return (
        <div className="h-screen flex flex-col bg-green-600">
            <img src={APNI1} alt="Logo" className="w-16 absolute top-2 left-3 z-10" />
            {/* Upper Section: Map */}
            <div className="w-full h-[60%] relative">
                <img src={Map} alt="Map" className="w-full h-full object-cover rounded-b-lg shadow-md" />
            </div>

            {/* Lower Section: Compact Ride Request */}
            <div className="w-full h-[40%] bg-white p-4 shadow-lg rounded-t-2xl backdrop-blur-md bg-opacity-80">
                {/* Customer Info */}
                <div className="flex items-center gap-3">
                    <img
                        src={rideRequests[currentRide].image}
                        alt="Customer"
                        className="w-12 h-12 rounded-full border border-gray-300 shadow-md"
                    />
                    <div>
                        <h3 className="text-lg font-semibold text-gray-800">{rideRequests[currentRide].customerName}</h3>
                        <p className="text-gray-600 text-sm">{rideRequests[currentRide].distance}</p>
                    </div>
                </div>

                {/* Ride Details (Smaller Height) */}
                <div className="mt-3 bg-gray-200 p-3 rounded-lg shadow-md text-sm">
                    <p className="text-gray-800"><span className="text-pink-500">📍</span> <strong>Pickup:</strong> {rideRequests[currentRide].pickup}</p>
                    <p className="text-gray-800"><span className="text-blue-500">🚖</span> <strong>Dropoff:</strong> {rideRequests[currentRide].dropoff}</p>
                    <p className="text-gray-800"><span className="text-yellow-500">💰</span> <strong>Fare:</strong> {rideRequests[currentRide].fare}</p>
                </div>

                {/* Buttons */}
                <div className="flex gap-3 mt-4">
                    <button 
                        className="flex-1 p-2 bg-red-700 text-white rounded-lg hover:bg-gray-500 transition text-sm"
                        onClick={handleIgnore}
                    >
                        Ignore
                    </button>
                    <button className="flex-1 p-2 bg-orange-500 text-white rounded-lg font-semibold hover:bg-yellow-600 transition text-sm">
                        Accept
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Saarthi_Home;
