import React from "react";
import ReactDOM from "react-dom";
import App from "./Components/App";
import "./index.css";
//import reportWebVitals from "./reportWebVitals";

ReactDOM.render(
  <React.StrictMode>
    <h1 id="title">Gude Tunes</h1>
    <h3 id="subtitle">Utilities to enhance your Spotify‎ experience</h3>
    <h5 id="help-text">
      Be sure to have Spotify recently paused or playing for most utilities.
    </h5>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

console.log(`Git hash: ${process.env.REACT_APP_VERSION}`);

//reportWebVitals();
