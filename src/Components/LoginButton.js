import React from "react";
import { requestAuth } from "../Utils";

function LoginButton() {
  return (
    <div>
      <p className="regText">Please login below to use the app</p>
      <button className="regText authButton" onClick={requestAuth}>
        Login
      </button>
    </div>
  );
}

export default LoginButton;
