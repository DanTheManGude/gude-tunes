import React, { useState, useEffect } from "react";
import {
  requestAuth,
  calculateAuthentication,
  getButtonOnClick,
} from "./Utils";
import { messageTypes, buttonIds, buttonProperties } from "./Constants";

function App() {
  const {
    code,
    message,
    hashItems: { access_token },
  } = calculateAuthentication();

  const [messageList, setMessageList] = useState([]);

  const addNewMessage = (newMessage) => {
    setMessageList((currentState) => currentState.concat(newMessage));
    setTimeout(() => {
      setMessageList((currentState) => currentState.slice(1));
    }, 6001);
  };

  useEffect(() => {
    const startingMessage =
      code === -1
        ? {
            type: messageTypes.ERROR,
            text: message,
          }
        : code === 1
        ? {
            type: messageTypes.SUCCESS,
            text: "Login succesfull!",
          }
        : {
            type: messageTypes.INFO,
            source: "Welcome",
            text: "Please login below to use the app.",
          };

    addNewMessage(startingMessage);
  }, [code, message]);

  return (
    <div>
      {messageList.map((message, index) => {
        const { type, text, source = "" } = message;
        return (
          <div key={`msg-${index}`} className={`message msg-${type}`}>
            {source && <strong>{source}: </strong>}
            {text}
          </div>
        );
      })}

      {code === 1 ? (
        buttonIds.map((buttonId) => {
          const { text, classNames = "", name } = buttonProperties[buttonId];
          return (
            <button
              key={buttonId}
              className={`utility-btn ${classNames}`}
              onClick={getButtonOnClick(
                buttonId,
                access_token,
                addNewMessage,
                name
              )}
            >
              {text}
            </button>
          );
        })
      ) : (
        <button className="loginButton" onClick={requestAuth}>
          Login
        </button>
      )}
    </div>
  );
}

export default App;
