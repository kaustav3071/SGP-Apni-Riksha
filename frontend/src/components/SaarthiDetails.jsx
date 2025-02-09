import React from "react";
import { useNavigate } from "react-router-dom";


const SaarthiDetails = () => {
    return (
        <div className="w-full h-[45%] bg-orange-300 p-5 shadow-lg rounded-t-2xl backdrop-blur-md">
                {/* Driver Info */}
                <div className="flex items-center gap-4">
                    {/* Profile Picture */}
                    <img
                        src="https://randomuser.me/api/portraits/men/38.jpg"
                        alt="Driver"
                        className="w-14 h-14 rounded-full border border-gray-300 shadow-md"
                    />
                    
                    {/* Name & Level */}
                    <div>
                        <h3 className="text-xl font-semibold text-black">Rohit Sharma</h3>
                        <p className="text-gray-900 text-sm">Basic Level</p>
                    </div>
                </div>

                {/* Stats Card */}
                <div className="mt-5 grid grid-cols-2 gap-3">
                    {/* Hours Online */}
                    <div className="flex flex-col items-center justify-center bg-green-400 text-white py-4 rounded-lg shadow-md">
                        <span className="text-2xl font-bold">10.2 ⏳</span>
                        <span className="text-sm">HOURS ONLINE</span>
                    </div>

                    {/* Distance Covered */}
                    <div className="flex flex-col items-center justify-center bg-green-400 text-white py-4 rounded-lg shadow-md">
                        <span className="text-2xl font-bold">30 KM 📍</span>
                        <span className="text-sm">TOTAL DISTANCE</span>
                    </div>

                    {/* Earnings */}
                    <div className="flex flex-col items-center justify-center bg-green-400 text-white py-4 rounded-lg shadow-md col-span-2">
                        <span className="text-2xl font-bold">Rs 3,000 🤑</span>
                        <span className="text-sm">TOTAL EARNING</span>
                    </div>
                </div>
            </div>
    );
};

export default SaarthiDetails;