import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { SaarthiDataContext } from "../context/SaarthiContext";
import axios from "axios";

const SaarthiProtectedWrapper = ({ children }) => {
    const token = localStorage.getItem("token");
    const navigate = useNavigate();
    const { saarthi, setSaarthi } = useContext(SaarthiDataContext);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!token) {
            console.log("No token found, redirecting to login...");
            navigate("/saarthi-login");
        } else {
            console.log("Fetching Saarthi profile...");
            axios
                .get(`${import.meta.env.VITE_BASE_URL}/saarthi/profile`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                .then((response) => {
                    if (response.status === 200) {
                        console.log("Saarthi profile fetched:", response.data);
                        setSaarthi(response.data.user); // Update the Saarthi context
                        setIsLoading(false);
                    }
                })
                .catch((error) => {
                    console.error("Error fetching Saarthi profile:", error);
                    navigate("/saarthi-login");
                    setIsLoading(false);
                });
        }
    }, [token, navigate, setSaarthi]);

    if (isLoading) {
        return <div>Loading...</div>; // Show a loading state until the profile is fetched
    }

    return <>{children}</>;
};

export default SaarthiProtectedWrapper;
