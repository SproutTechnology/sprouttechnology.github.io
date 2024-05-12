import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import ScrollToAnchor from "./components/ScrollToAnchor";
import ScriptInit from "./scripts/ScriptInit";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <BrowserRouter>
            <App />
            <ScrollToAnchor />
            <ScriptInit />
        </BrowserRouter>
    </React.StrictMode>,
);
