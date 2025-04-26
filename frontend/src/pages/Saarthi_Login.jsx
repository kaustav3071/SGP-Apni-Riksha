import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { SaarthiDataContext } from "../context/SaarthiContext";

const Saarthi_Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [SaarthiData, setSaarthiData] = useState({});


    const navigate = useNavigate();
    const { saarthi, setSaarthi } = React.useContext(SaarthiDataContext);

    const submitHandler = async (e) => {
        e.preventDefault();
        const saarthiData = { email, password };
        setEmail("");
        setPassword("");
    
        try {
            console.log("Sending request to:", import.meta.env.VITE_BASE_URL + "/saarthi/login");
            console.log("Request data:", saarthiData);
    
            const response = await axios.post(import.meta.env.VITE_BASE_URL + "/saarthi/login", saarthiData);
    
            if (response.status === 200) {
                const data = response.data;
                setSaarthi(data.saarthi); // Set Saarthi details in context
                localStorage.setItem("token", data.token); // Store token in local storage
                localStorage.setItem("saarthi", JSON.stringify(data.saarthi)); // Store Saarthi details in local storage
                alert("Saarthi logged in successfully");
                navigate("/saarthi-home");
            }
        } catch (error) {
            console.error("Login failed:", error.response?.data || error.message);
            alert(error.response?.data?.message || "Saarthi not logged in");
        }
    };





    return (
            <div className="h-screen flex flex-col bg-yellow-100 p-7 justify-center items-center" style={{ fontFamily: 'sans-serif' }}>
                <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md" style={{height: "550px"}}>
                <div className="flex items-center justify-center mb-4"> {/* Container for icon and title */}
                    <img width="40" height="40" src="https://img.icons8.com/color/48/auto-rickshaw.png" alt="auto-rickshaw" className="mr-2" /> {/* Added margin-right */}
                    <h1 className="text-3xl font-medium text-gray-800">Saarthi Sign In</h1>
                </div>
                    <form className="space-y-4" onSubmit={submitHandler}>
                        <h3 className="text-lg font-medium mb-2 text-gray-700">What's Your Email</h3>
                        <input
                            className="bg-yellow-100 mb-7 px-4 py-2 border border-gray-300 rounded-lg w-full text-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-600"
                            required
                            type="email"
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value)
                            }}
                            placeholder="Email"
                        />
    
                        <h3 className="text-lg font-medium mb-2 text-gray-700">Password</h3>
                        <input
                            className="bg-yellow-100 mb-7 px-4 py-2 border border-gray-300 rounded-lg w-full text-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-600"
                            required
                            type="password"
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value)
                            }}
                            placeholder="Password"
                        />
    
                        <button
                            className="bg-orange-500 text-white font-semibold rounded-lg py-2 px-4 mt-4 mb-7 w-full hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-600"
                            type="submit"
                        >
                            Login
                        </button>
                        <div className="text-center mt-4">
                            <p className="text-gray-600">New Saarthi? <Link to="/saarthi-signup" className="text-blue-600 hover:underline">Register as a Saarthi</Link></p>
                        </div>
                    </form>
                    <Link to="/login" 
                        className="block bg-green-500 text-white font-semibold rounded-lg py-2 px-4 w-full mt-9 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-600 text-center justify-center"
                    >
                        Sign in as User
                    </Link>
                </div>
            </div>
        );

}

export default Saarthi_Login;