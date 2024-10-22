import { StrictMode } from "react";
import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { NextUIProvider } from "@nextui-org/react";
import CartContextProvider from "./context/CartContext.jsx";
import AuthContextProvider from "./context/AuthContext.jsx";
import MyState from "./context/MyState.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <NextUIProvider>
      <MyState>
        <AuthContextProvider>
          <CartContextProvider>
            <App />
          </CartContextProvider>
        </AuthContextProvider>
      </MyState>
    </NextUIProvider>
  </StrictMode>
);
