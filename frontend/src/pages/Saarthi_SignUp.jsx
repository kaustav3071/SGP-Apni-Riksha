import React, { useState } from "react";
import { Link } from "react-router-dom";

const Saarthi_Signup = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [vehicleColor, setVehicleColor] = useState("");
    const [plateNumber, setPlateNumber] = useState("");
    const [seatCapacity, setSeatCapacity] = useState("");
    const [vehicleType, setVehicleType] = useState("auto");
    const [SaarthiData,setSaarthiDat] = useState({});

    const submitHandler = (e) => {
        e.preventDefault();
        setSaarthiDat({
            fullName:{
                firstName: firstName,
                lastName: lastName,
            },
            email: email,
            password: password,
            vehicleColor: vehicleColor,
            plateNumber: plateNumber,
            seatCapacity: seatCapacity,
            vehicleType: vehicleType
        });
        setFirstName("");
        setLastName("");
        setEmail("");
        setPassword("");
        setVehicleColor("");
        setPlateNumber("");
        setSeatCapacity("");
    };

    return (
        <div className="h-screen flex flex-col bg-yellow-100 p-7 justify-center items-center" style={{ fontFamily: 'sans-serif' }}>
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <div className="flex items-center justify-center mb-4">
                    <img width="40" height="40" src="https://img.icons8.com/color/48/auto-rickshaw.png" alt="passenger" className="mr-2" />
                    <h1 className="text-3xl font-medium text-gray-800">Create Saarthi Account</h1>
                </div>
                <form className="space-y-4" onSubmit={submitHandler}>
                    <div className="flex space-x-2">
                        <div className="w-1/2">
                            <h3 className="text-lg font-medium mb-2 text-gray-700">First Name*</h3>
                            <input
                                className="bg-yellow-100 mb-4 px-4 py-2 border border-gray-300 rounded-lg w-full text-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-600"
                                required
                                type="text"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                placeholder="First Name"
                            />
                        </div>
                        <div className="w-1/2">
                            <h3 className="text-lg font-medium mb-2 text-gray-700">Last Name</h3>
                            <input
                                className="bg-yellow-100 mb-4 px-4 py-2 border border-gray-300 rounded-lg w-full text-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-600"
                                required
                                type="text"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                placeholder="Last Name"
                            />
                        </div>
                    </div>

                    <div className="flex space-x-2">
                        <div className="w-1/2">
                            <h3 className="text-lg font-medium mb-2 text-gray-700">Email*</h3>
                            <input
                                className="bg-yellow-100 mb-4 px-4 py-2 border border-gray-300 rounded-lg w-full text-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-600"
                                required
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Email"
                            />
                        </div>
                        <div className="w-1/2">
                            <h3 className="text-lg font-medium mb-2 text-gray-700">Password*</h3>
                            <input
                                className="bg-yellow-100 mb-4 px-4 py-2 border border-gray-300 rounded-lg w-full text-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-600"
                                required
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Password"
                            />
                        </div>
                    </div>

                    <div className="flex space-x-2">
                        <div className="w-1/2">
                            <h3 className="text-lg font-medium mb-2 text-gray-700">Vehicle Color*</h3>
                            <input
                                className="bg-yellow-100 mb-4 px-4 py-2 border border-gray-300 rounded-lg w-full text-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-600"
                                required
                                type="text"
                                value={vehicleColor}
                                onChange={(e) => setVehicleColor(e.target.value)}
                                placeholder="Vehicle Color"
                            />
                        </div>
                        <div className="w-1/2">
                            <h3 className="text-lg font-medium mb-2 text-gray-700">Seat Capacity*</h3>
                            <select
                                className="bg-yellow-100 mb-4 px-4 py-2 border border-gray-300 rounded-lg w-full text-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-600"
                                required
                                value={seatCapacity}
                                onChange={(e) => setSeatCapacity(e.target.value)}
                            >
                                <option value="" disabled>Select</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                            </select>
                        </div>
                    </div>

                    <div className="flex space-x-2">
                        <div className="w-1/2">
                            <h3 className="text-lg font-medium mb-2 text-gray-700">Plate Number*</h3>
                            <input
                                className="bg-yellow-100 mb-4 px-4 py-2 border border-gray-300 rounded-lg w-full text-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-600"
                                required
                                type="text"
                                value={plateNumber}
                                onChange={(e) => setPlateNumber(e.target.value)}
                                placeholder="Plate Number"
                            />
                        </div>
                        <div className="w-1/2">
                            <h3 className="text-lg font-medium mb-2 text-gray-700">Vehicle Type</h3>
                            <select
                                className="bg-yellow-100 mb-4 px-4 py-2 border border-gray-300 rounded-lg w-full text-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-600"
                                required
                                value={vehicleType}
                                onChange={(e) => setVehicleType(e.target.value)}
                            >
                                <option value="auto">Auto</option>
                            </select>
                        </div>
                    </div>

                    <button
                        className="bg-green-600 text-white font-semibold rounded-lg py-2 px-4 mt-4 mb-7 w-full hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-600"
                        type="submit"
                    >
                        Create Account
                    </button>
                    <div className="text-center mt-4">
                        <p className="text-gray-600">Already have an account? <Link to="/login" className="text-blue-600 hover:underline">Sign In</Link></p>
                    </div>
                </form>
                <div className="mt-8 text-center text-sm text-gray-600">
                    By creating an account, you agree to our <Link to="/terms" className="text-blue-600 hover:underline">Terms of Service</Link> and <Link to="/privacy" className="text-blue-600 hover:underline">Privacy Policy</Link>.
                </div>
            </div>
        </div>
    );
};

export default Saarthi_Signup;
