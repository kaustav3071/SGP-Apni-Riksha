import React, { useState, createContext } from "react";

export const UserDataContext = createContext();

const UserContext = ({ children }) => {
    const [user, setUser] = useState({
        email: "",
        fullName: {
            firstName: "",
            lastName: "",
        },
        _id: "", // Add _id to match the destructuring in Home.jsx
    });

    return (
        <UserDataContext.Provider value={{ user, setUser }}>
            {children}
        </UserDataContext.Provider>
    );
};

export default UserContext;