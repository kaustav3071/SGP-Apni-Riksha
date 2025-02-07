import React, { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import Welcome from "./pages/Welcome";
import User_Login from "./pages/User_Login";
import User_SignUp from "./pages/User_SignUp";
import Saarthi_Login from "./pages/Saarthi_Login";
import Saarthi_SignUp from "./pages/Saarthi_SignUp";
import { UserDataContext } from "./context/userContext";
import Home from "./pages/Home";

const App = () => {

    return (
        <div>
            <Routes>
                <Route path="/" element={<Welcome/>} />
                <Route path="/login" element={<User_Login />} />
                <Route path="/signup" element={<User_SignUp />} />
                <Route path="/saarthi-login" element={<Saarthi_Login />} />
                <Route path="/saarthi-signup" element={<Saarthi_SignUp />} />
                <Route path="/home" element={<Home />} />
            </Routes>
        </div>
    );
};
export default App;
