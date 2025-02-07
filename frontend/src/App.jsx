import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import User_Login from "./pages/User_Login";
import User_SignUp from "./pages/User_SignUp";
import Saarthi_Login from "./pages/Saarthi_Login";
import Saarthi_SignUp from "./pages/Saarthi_SignUp";


const App = () => {
    return (
        <div>
            <Routes>
                <Route path="/" element={<Home/>} />
                <Route path="/login" element={<User_Login />} />
                <Route path="/signup" element={<User_SignUp />} />
                <Route path="/saarthi-login" element={<Saarthi_Login />} />
                <Route path="/saarthi-signup" element={<Saarthi_SignUp />} />
            </Routes>
        </div>
    );
};
export default App;
