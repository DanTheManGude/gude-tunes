import React, { useState } from "react";
import Main from "./Main";
import LoginButton from "./LoginButton";
import { calculateAuthentication } from "../Utils";
import { messageActions, messageTypes } from "../Constants";

function App() {
  const { code, message, payload } = calculateAuthentication();

  const startingMessage =
    code === -1
      ? {
          type: messageTypes.ERROR,
          text: message,
        }
      : code === 1
      ? {
          type: messageTypes.SUCCESS,
          text: "Login succesfull",
        }
      : {
          type: messageTypes.INFO,
          text: "Welcome!",
        };

  const [messageList, setMessageList] = useState([
    { ...startingMessage, id: 0 },
  ]);
  const [messageId, setMessageId] = useState(1);

  const getNewId = () => {
    setMessageId((currentState) => currentState + 1);
    return messageId;
  };

  const updateMessageList = (action, value) => {
    switch (action) {
      case messageActions.CREATE:
        const newId = getNewId();
        setMessageList((currentState) => [
          ...currentState,
          { ...value, id: newId },
        ]);
        console.log(newId);
        return newId;
      case messageActions.DELETE:
        setMessageList((currentState) =>
          currentState.filter((element) => element.id !== value)
        );
        return 0;
      default:
        return -1;
    }
  };

  console.log(messageList);
  return (
    <div>
      {messageList.map((message) => {
        const { type, text, source = "", id } = message;
        return (
          <div id={`msg-${id}`} className={`message msg-${type}`}>
            <span
              className="close-message"
              onClick={() => updateMessageList(messageActions.DELETE, id)}
            >
              &times;
            </span>
            {source && <strong>{source}: </strong>}
            {text}
          </div>
        );
      })}

      {code === 1 ? (
        <Main hashItems={payload} updateMessageList={updateMessageList} />
      ) : (
        <LoginButton />
      )}
    </div>
  );
}

export default App;
