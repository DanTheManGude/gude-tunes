import React from "react";
import { requestAuth } from "../Utils";

function LoginButton() {
  return (
    <div>
      <button className="regText authButton" onClick={requestAuth}>
        Login
      </button>
    </div>
  );
}

export default LoginButton;
