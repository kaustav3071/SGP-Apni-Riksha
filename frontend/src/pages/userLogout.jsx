import React from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { UserDataContext } from "../context/userContext";
import axios from "axios";

const UserLogout = () => {
    const { user, setUser } = React.useContext(UserDataContext);
    const navigate = useNavigate();

    const logoutHandler = async () => {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/users/logout`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (response.status === 200) {
            setUser({});
            localStorage.removeItem("token");
            alert("User logged out successfully");
            navigate("/login");
        } else {
            alert("User not logged out");
        }
    };

    return (
        <div className="h-screen flex flex-col bg-yellow-100 p-7 justify-center items-center" style={{ fontFamily: 'sans-serif' }}>
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <div className="flex items-center justify-center mb-4">
                    <img width="40" height="40" src="https://img.icons8.com/stickers/50/passenger.png" alt="passenger" className="mr-2" />
                    <h1 className="text-3xl font-medium text-gray-800">User Logout</h1>
                </div>
                <button
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    onClick={logoutHandler}
                >
                    Logout
                </button>
            </div>
        </div>
    );
}

export default UserLogout;