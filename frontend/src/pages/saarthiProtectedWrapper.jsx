import React, { useEffect, useState, useContext } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { SaarthiDataContext } from "../context/saarthiContext";
import axios from "axios";


const SaarthiProtectedWrapper = ({ children }) => {
    const token = localStorage.getItem("token");
    const navigate = useNavigate();
    const { saarthi, setSaarthi } = useContext(SaarthiDataContext);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!token) {
            navigate("/saarthi-login");
        } else {
            axios.get(`${import.meta.env.VITE_BASE_URL}/saarthi/profile`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                if (response.status === 200) {
                    setSaarthi(response.data.saarthi);
                    setIsLoading(false);
                }
            })
            .catch((error) => {
                console.log(error);
                navigate("/saarthi-login");
                setIsLoading(false);
            });
        }
    }, [token, navigate, setSaarthi]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return <>{children}</>;
};

export default SaarthiProtectedWrapper;
