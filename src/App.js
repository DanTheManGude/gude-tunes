import React, { useState, useEffect } from "react";
import {
  requestAuth,
  calculateAuthentication,
  getButtonOnClick,
  request,
  getSendEmail,
} from "./Utils";
import {
  messageTypes,
  buttonIds,
  buttonProperties,
  existingUsers,
} from "./Constants";

function App() {
  const {
    code,
    message,
    hashItems: { access_token },
  } = calculateAuthentication();

  const [messageList, setMessageList] = useState([]);
  const [newUser, setNewUser] = useState({ is: false });

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

  useEffect(() => {
    if (!access_token) return;

    console.log(access_token);
    request("/me", "GET", access_token)
      .then((response) => {
        const { status } = response;
        if (status === 200) {
          const { email, display_name: displayName } = response;
          if (!existingUsers.includes("email")) {
            addNewMessage({
              type: messageTypes.INFO,
              source: "Application",
              text: "Only designated Spotify accounts can use the application. Click below to request access.",
            });
            setNewUser({ is: true, info: { email, displayName } });
          }
        } else {
          throw response;
        }
      })
      .catch((error) => {
        // addNewMessage({
        //   type: messageTypes.WARNING,
        //   source: "Application",
        //   text: "Something isn't right, the app may be currently unavailable.",
        // });
        console.error(error);
      });
  }, [access_token]);

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

      {newUser.is && (
        <button
          key={"NEWUSER"}
          className={"utility-btn new-user-btn"}
          onClick={getSendEmail(addNewMessage, newUser.info)}
        >
          Request Access
        </button>
      )}

      {code === 1 ? (
        buttonIds.map((buttonId) => {
          const { text, classNames = "", name } = buttonProperties[buttonId];
          return (
            <button
              key={buttonId}
              className={["utility-btn", ...classNames].join(" ")}
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
