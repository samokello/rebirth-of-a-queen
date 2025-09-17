import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import App from "./App";
import { ThemeProvider } from "styled-components";
import theme from "./styles/theme";
import "./styles/TextVisibility.css";

const initialOptions = {
  "client-id": "AXPpMGoRo_4M0n20SHRmHL_42REtB7QHPwnB9bQ8TX1POOoGkLWS8PTQ5KtVSxZk7yqfYVRDessd-jQ6",
  currency: "USD",
};

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <PayPalScriptProvider options={initialOptions}>
        <ThemeProvider theme={theme}>
          <App />
        </ThemeProvider>
      </PayPalScriptProvider>
    </BrowserRouter>
  </React.StrictMode>
); 