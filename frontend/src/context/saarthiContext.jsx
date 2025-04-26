import React, { createContext, useState, useEffect } from "react";

export const SaarthiDataContext = createContext();

const SaarthiContext = ({ children }) => {
    const [saarthi, setSaarthi] = useState({
        fullName: {
            firstName: "",
            lastName: "",
        },
        email: "",
        _id: "",
        socketId: null,
        status: "offline",
        vehicle: {
            color: "",
            plate: "",
            capacity: 0,
            type: "",
        },
        location: {
            latitude: null,
            longitude: null,
        },
    });

    useEffect(() => {
        console.log("Saarthi context updated:", saarthi);
    }, [saarthi]);

    return (
        <SaarthiDataContext.Provider value={{ saarthi, setSaarthi }}>
            {children}
        </SaarthiDataContext.Provider>
    );
};

export default SaarthiContext;