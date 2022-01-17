import React, { useState, useEffect } from "react";
import {
  requestAuth,
  calculateAuthentication,
  getButtonIdsForUser,
  getButtonOnClick,
  makeRequest,
  getSendEmail,
} from "./Utils";
import { messageTypes, buttonProperties, existingUsersMap } from "./Constants";

function App() {
  const {
    code,
    message,
    hashItems: { access_token },
  } = calculateAuthentication();

  const [messageList, setMessageList] = useState([]);
  const [user, setUser] = useState();

  const addNewMessage = (newMessage, time = 6001) => {
    setMessageList((currentState) => currentState.concat(newMessage));
    setTimeout(() => {
      setMessageList((currentState) => currentState.slice(1));
    }, time);
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
    makeRequest("me", "GET", access_token)
      .then((r) => {
        if (r.status === 401) {
          window.location.href = `${window.location.origin}${window.location.pathname}`;
        }
        return r.json();
      })
      .then((response) => {
        const { email, display_name: displayName } = response;
        const isNew = !Object.keys(existingUsersMap).includes(email);
        if (isNew) {
          addNewMessage(
            {
              type: messageTypes.INFO,
              source: "Application",
              text: `Sorry ${displayName}, Only designated Spotify accounts can use the application. Click below to request access.`,
            },
            12000
          );
        }
        setUser({ isNew, info: { email, displayName } });
      })
      .catch((error) => {
        addNewMessage({
          type: messageTypes.WARNING,
          source: "Application",
          text: "Something isn't right, the app may be currently unavailable.",
        });
        console.error(error);
      });
  }, [access_token]);

  const renderMessageList = () => {
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
      </div>
    );
  };

  const renderLoginButton = () => {
    return (
      <button className="loginButton" onClick={requestAuth}>
        Login
      </button>
    );
  };

  const renderContents = () => {
    if (!user) {
      return renderLoginButton();
    }

    if (user.isNew) {
      return (
        <button
          key={"NEWUSER"}
          className={"utility-btn new-user-btn"}
          onClick={getSendEmail(addNewMessage, user.info)}
        >
          Request Access
        </button>
      );
    }

    if (code === 1) {
      return getButtonIdsForUser(user.info.email).map((buttonId) => {
        const { text, classNames } = buttonProperties[buttonId];
        return (
          <button
            key={buttonId}
            className={["utility-btn", ...classNames].join(" ")}
            onClick={getButtonOnClick(
              buttonId,
              access_token,
              addNewMessage,
              existingUsersMap[user.info.email]
            )}
          >
            {text}
          </button>
        );
      });
    }
  };

  return (
    <div>
      {renderMessageList()}
      {renderContents()}
    </div>
  );
}

export default App;
