import React from "react";
import Map from "../assets/UberAuto-Delhi.jpg"; // Replace with the actual live map integration

const Riding = () => {
//     if (!rideDetails) return <p>Loading ride details...</p>;

    return (
        <div className="h-screen flex flex-col bg-yellow-100 relative">
            {/* Map Section */}
            <div className="w-full h-1/3 relative">
                <img src={Map} alt="Map" className="w-full h-full object-cover rounded-b-lg shadow-md" />
                {/* Estimated Arrival Time */}
                <div className="absolute top-5 left-5 bg-white shadow-md p-2 rounded-lg text-sm font-semibold">
                    Arrival 8 min
                </div>
            </div>

            {/* Ride Details Section */}
            <div className="p-4 bg-white shadow-md rounded-lg -mt-4 relative">
                {/* Driver & Vehicle Info */}
                <div className="flex items-center gap-4">
                    <img src="https://img.icons8.com/ios/100/car--v1.png" alt="Car Icon" className="w-12 h-12" />
                    <div>
                        <h3 className="text-lg font-bold">.driverName</h3>
                        <p className="text-gray-600 text-sm">vehicleNumber</p>
                        <p className="text-gray-600 text-sm">vehicleModel</p>
                    </div>
                </div>

                {/* Pickup Location */}
                <div className="flex items-center gap-3 mt-4">
                    <i className="ri-map-pin-2-fill text-xl text-gray-700"></i>
                    <div>
                        <h3 className="text-lg font-medium">pickup</h3>
                        <p className="text-sm text-gray-600">city</p>
                    </div>
                </div>

                {/* Fare Details */}
                <div className="flex items-center gap-3 mt-4">
                    <i className="ri-currency-line text-xl text-gray-700"></i>
                    <div>
                        <h3 className="text-lg font-medium">₹100</h3>
                        <p className="text-sm text-gray-600">UPI</p>
                    </div>
                </div>

                {/* Make a Payment Button */}
                <button className="w-full mt-5 bg-green-600 text-white font-semibold p-3 rounded-lg">
                    Make a Payment
                </button>
            </div>
        </div>
    );
};

export default Riding;
