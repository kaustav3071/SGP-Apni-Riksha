import React from "react";
import { Link } from "react-router-dom";
import APNI1 from "../assets/APNI1.png";

const Welcome = () => {
    return (
        <div className="h-screen flex flex-col items-center bg-yellow-100" style={{ fontFamily: 'sans-serif' }}>
            {/* Curved Text using SVG */}
            <svg className="w-56 h-20 mt-8" viewBox="0 0 300 100">
                <path id="curve" d="M 50 100 Q 150 -20 250 100" fill="transparent" />
                <text fontSize="41" fontWeight="bold" fill="#111111">
                    <textPath href="#curve" startOffset="50%" textAnchor="middle">
                        APNI RIKSHA
                    </textPath>
                </text>
            </svg>

            {/* Logo Image */}
            <img src={APNI1} alt="Logo" className="w-48 h-48 object-contain" />

            {/* Spacer to push content down */}
            <div className="flex-grow"></div>

            {/* Bottom Section */}
            <div className="bg-yellow-200 p-8 rounded-t-lg text-center shadow-lg w-full absolute bottom-0">
                <h2 className="text-green-700 text-2xl font-bold">Apni Riksha, Ride Easy</h2>
                <Link to="/login"    
                    className="block w-full mt-4 py-3 bg-green-700 text-white rounded-lg hover:bg-gray-800 text-center justify-center"
                >
                    Continue
                </Link>
            </div>
        </div>
    );
};

export default Welcome;
