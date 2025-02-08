import React, { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import Welcome from "./pages/Welcome";
import User_Login from "./pages/User_Login";
import User_SignUp from "./pages/User_SignUp";
import Saarthi_Login from "./pages/Saarthi_Login";
import Saarthi_SignUp from "./pages/Saarthi_SignUp";
import { UserDataContext } from "./context/userContext";
import Home from "./pages/Home";
import UserProtectedWrapper from "./pages/userProtectedWrapper";
import UserLogout from "./pages/userLogout";
import Saarthi_Home from "./pages/Saarthi_home";
import SaarthiProtectedWrapper from "./pages/saarthiProtectedWrapper";
import SaarthiLogout from "./pages/saarthiLogout";  

const App = () => {

    return (
        <div>
            <Routes>
                <Route path="/" element={<Welcome/>} />
                <Route path="/login" element={<User_Login />} />
                <Route path="/signup" element={<User_SignUp />} />
                <Route path="/saarthi-login" element={<Saarthi_Login />} />
                <Route path="/saarthi-signup" element={<Saarthi_SignUp />} />
                <Route path="/home" element={
                    <UserProtectedWrapper>
                        <Home />
                    </UserProtectedWrapper>
                } />
                
                <Route path="/saarthi-home" element={
                    <SaarthiProtectedWrapper>
                        <Saarthi_Home />
                    </SaarthiProtectedWrapper>
                } />


                <Route path='/users/logout' element={ <UserProtectedWrapper>
                    <UserLogout/>
                </UserProtectedWrapper>} >
                </Route>

                <Route path='/saarthi/logout' element={ <SaarthiProtectedWrapper>
                    <SaarthiLogout/>
                </SaarthiProtectedWrapper>} >
                </Route>


            </Routes>
        </div>
    );
};
export default App;
