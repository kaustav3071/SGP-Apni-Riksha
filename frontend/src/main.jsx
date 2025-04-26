import React from "react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import UserContext from "./context/userContext.jsx";
import SaarthiContext from "./context/SaarthiContext.jsx";
import SocketProvider from "./context/socketContext.jsx";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <SocketProvider>
      <SaarthiContext>
        <UserContext>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </UserContext>
      </SaarthiContext>
    </SocketProvider>
  </React.StrictMode>
);