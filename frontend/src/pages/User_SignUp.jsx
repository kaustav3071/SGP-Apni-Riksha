import React, { useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import axios from "axios";
import { UserDataContext } from "../context/userContext";

const User_Signup = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [userData, setUserData] = useState({});

    const navigate = useNavigate();

    const { user, setUser } = React.useContext(UserDataContext);

    const submitHandler = async (e) => {
        e.preventDefault();
        const NewUser={
            fullName:{
                firstName:firstName,
                lastName:lastName
            },
            email:email,
            password:password
        }

        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/register`, NewUser);

        if (response.status === 201) {
            const data= response.data;
            setUser(data.user);
            alert("User created successfully");
            navigate("/home");
        } else {
            alert("User not created");
        }

        
        setFirstName("");
        setLastName("");
        setEmail("");
        setPassword("");
    };

    return (
        <div className="h-screen flex flex-col bg-yellow-100 p-7 justify-center items-center" style={{ fontFamily: 'sans-serif' }}>
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <div className="flex items-center justify-center mb-4">
                    <img width="40" height="40" src="https://img.icons8.com/stickers/50/passenger.png" alt="passenger" className="mr-2" />
                    <h1 className="text-3xl font-medium text-gray-800">Create User Account</h1>
                </div>
                <form className="space-y-4" onSubmit={submitHandler}>
                    <div className="flex space-x-2"> {/* First and Last Name in one row */}
                        <div className="w-1/2"> {/* Adjust width as needed */}
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
                        <div className="w-1/2"> {/* Adjust width as needed */}
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

                    <h3 className="text-lg font-medium mb-2 text-gray-700">Email*</h3>
                    <input
                        className="bg-yellow-100 mb-4 px-4 py-2 border border-gray-300 rounded-lg w-full text-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-600"
                        required
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                    />

                    <h3 className="text-lg font-medium mb-2 text-gray-700">Password*</h3>
                    <input
                        className="bg-yellow-100 mb-7 px-4 py-2 border border-gray-300 rounded-lg w-full text-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-600"
                        required
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                    />

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
                <div className="mt-8 text-center text-sm text-gray-600">  {/* Added policy text */}
                    By creating an account, you agree to our <Link to="/terms" className="text-blue-600 hover:underline">Terms of Service</Link> and <Link to="/privacy" className="text-blue-600 hover:underline">Privacy Policy</Link>.
                </div>
            </div>
        </div>
    );
};

export default User_Signup;