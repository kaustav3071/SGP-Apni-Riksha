import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const ConfirmRidePopUp = ({ ride, onCancel }) => {
    const [otp, setOtp] = useState("");
    const navigate = useNavigate();

    return (
        <div className="fixed inset-0 bg-white shadow-2xl rounded-lg z-50 flex flex-col h-screen overflow-hidden">
            {/* Header */}
            <div className="relative flex justify-between items-center p-4 border-b border-gray-200 bg-gray-50">
                <button onClick={onCancel} className="text-lg font-semibold text-gray-600 hover:text-black transition">
                    ← Back
                </button>
                <h2 className="text-xl font-bold">Ride #{ride?.id || "123456"}</h2>
            </div>

            {/* Main Content (Scrollable) */}
            <div className="flex-grow overflow-y-auto">
                {/* Passenger Details */}
                <div className="p-4 flex items-center gap-4 border-b border-gray-200">
                    <img
                        src={ride?.profilePic || "https://randomuser.me/api/portraits/men/87.jpg"}
                        alt="Passenger"
                        className="w-14 h-14 rounded-full border shadow"
                    />
                    <div>
                        <p className="font-semibold">{ride?.name || "Om Choksi"}</p>
                        <div className="flex gap-2">
                            <span className="bg-yellow-300 text-black text-xs px-2 py-1 rounded">FamPay</span>
                            <span className="bg-gray-300 text-black text-xs px-2 py-1 rounded">Discount</span>
                        </div>
                    </div>
                    <p className="ml-auto font-bold text-lg">₹{ride?.fare?.toFixed(2) || "25.00"}</p>
                </div>

                {/* Ride Details */}
                <div className="p-4 border-b border-gray-200">
                    <p className="text-sm text-gray-500">PICK UP</p>
                    <p className="font-semibold">{ride?.pickup || "7958 Swift Village"}</p>

                    <p className="mt-2 text-sm text-gray-500">DROP OFF</p>
                    <p className="font-semibold">{ride?.dropoff || "105 William St, Chicago, US"}</p>

                    <p className="mt-2 text-sm text-gray-500">NOTED</p>
                    <p className="text-gray-600">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                </div>

                {/* Trip Fare */}
                <div className="p-4 border-b border-gray-200">
                    <p className="text-sm text-gray-500">TRIP FARE</p>
                    <p className="flex justify-between"><span>Apple Pay</span><span>₹15.00</span></p>
                    <p className="flex justify-between"><span>Discount</span><span>-₹10.00</span></p>
                    <p className="flex justify-between font-bold"><span>Paid Amount</span><span>₹25.00</span></p>
                </div>

                {/* Buttons */}
                <div className="flex justify-between p-4 bg-gray-100 border-b border-gray-200">
                    <button className="w-1/2 bg-green-500 text-white py-3 rounded-lg shadow-md mx-2 transition-all hover:bg-green-600 hover:scale-105 active:scale-95">
                        📞 Call
                    </button>
                    <button className="w-1/2 bg-blue-500 text-white py-3 rounded-lg shadow-md mx-2 transition-all hover:bg-blue-600 hover:scale-105 active:scale-95">
                        💬 Message
                    </button>
                </div>
            </div>
            {/* GO TO PICKUP & CANCEL BUTTONS */}
            <div className="p-4 bg-gray-100 border-t border-gray-200">
                <form className="flex flex-col gap-4">
                    <input 
                        type="text" 
                        placeholder="Enter OTP" 
                        className="w-full p-3 border rounded-lg" 
                        value={otp} 
                        onChange={(e) => setOtp(e.target.value)} 
                    />
                    <Link
                        to="/captainRiding" // Link to the captainRiding page
                        className={`w-full py-3 font-semibold text-lg shadow-lg rounded-lg transition-all text-center ${
                            otp === "123" 
                            ? "bg-yellow-500 text-black hover:bg-yellow-600 hover:scale-105 active:scale-95" 
                            : "bg-gray-300 text-gray-500 cursor-not-allowed"
                        }`}
                        onClick={(e) => {
                            if (otp !== "123") e.preventDefault();
                        }}
                    >
                        🚕 GO TO PICKUP
                    </Link>
                </form>
                <button 
                    onClick={onCancel} 
                    className="w-full bg-red-500 text-white py-2 font-semibold text-lg shadow-lg rounded-lg mt-4 transition-all hover:bg-red-600 hover:scale-105 active:scale-95"
                >
                    ❌ Cancel Ride
                </button>
            </div>
        </div>
    );
};

export default ConfirmRidePopUp;
