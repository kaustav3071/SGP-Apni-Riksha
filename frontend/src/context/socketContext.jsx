import React, { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";

export const SocketContext = createContext();

const SocketProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        const newSocket = io(import.meta.env.VITE_BASE_URL, {
            transports: ["websocket"],
            reconnection: true,
            reconnectionAttempts: 5,
        });

        setSocket(newSocket);

        newSocket.on("connect", () => {
            console.log("Connected to server:", newSocket.id);
        });

        newSocket.on("disconnect", () => {
            console.log("Disconnected from server");
        });

        return () => {
            newSocket.disconnect();
        };
    }, []);

    const sendMessage = (eventName, message) => {
        if (socket) {
            socket.emit(eventName, message);
        } else {
            console.error("Socket is not connected");
        }
    };

    const receiveMessage = (eventName, callback) => {
        if (socket) {
            socket.on(eventName, callback);
        } else {
            console.error("Socket is not connected");
        }
    };

    return (
        <SocketContext.Provider value={{ sendMessage, receiveMessage }}>
            {children}
        </SocketContext.Provider>
    );
};

export const useSocket = () => useContext(SocketContext);

export default SocketProvider;