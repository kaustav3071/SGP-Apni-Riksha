import React, { useState,useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { UserDataContext } from "../context/userContext";
import { useNavigate } from "react-router-dom";


const User_Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [userDate, setUserDate] = useState({});

    const { user, setUser } = React.useContext(UserDataContext);
    const navigate = useNavigate();

    const submitHandler = async (e) => {
        e.preventDefault();
        const userDate = {
            email: email,
            password: password
        };
        setEmail("");
        setPassword("");

        const response = await axios.post(import.meta.env.VITE_BASE_URL + "/users/login", userDate)

        if (response.status === 200) {
            const data = response.data;
            setUser(data.user);
            alert("User logged in successfully");
            navigate("/home");
        } else {
            alert("User not logged in");
        }

    };
    return (
        <div className="h-screen flex flex-col bg-yellow-100 p-7 justify-center items-center" style={{ fontFamily: 'sans-serif' }}>
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md" style={{height: "500px"}}>
                <div className="flex items-center justify-center mb-4"> {/* Container for icon and title */}
                    <img width="40" height="40" src="https://img.icons8.com/stickers/50/passenger.png" alt="passenger" className="mr-2" /> {/* Added margin-right */}
                    <h1 className="text-3xl font-medium text-gray-800">User Sign In</h1>
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
                        className="bg-green-600 text-white font-semibold rounded-lg py-2 px-4 mt-4 mb-7 w-full hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-600"
                        type="submit"
                    >
                        Login
                    </button>
                    <div className="text-center mt-4">
                        <p className="text-gray-600">New here? <Link to="/signup" className="text-blue-600 hover:underline">Create new Account</Link></p>
                    </div>
                </form>
                <Link to="/saarthi-login" 
                    className="block bg-orange-500 text-white font-semibold rounded-lg py-2 px-4 w-full mt-9 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-600 text-center justify-center"
                >
                    Sign in as Saarthi
                </Link>
            </div>
        </div>
    );
};

export default User_Login;