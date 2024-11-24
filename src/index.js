import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <h1 id="title">Gude Tunes</h1>
    <h3 id="subtitle">Utilities to enhance your Spotify experience</h3>
    <h5 id="help-text">
      Be sure to have Spotify recently paused or playing for most utilities.
    </h5>
    <App />
  </React.StrictMode>
);

console.log(`Git hash: ${process.env.REACT_APP_VERSION}`);
