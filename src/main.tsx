import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AudioProvider } from "./hooks/AudioContext/AudioContext";
// import { LibraryProvider } from "./hooks/LibraryContext";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <AudioProvider>
            <App />
        </AudioProvider>
    </React.StrictMode>,
);
