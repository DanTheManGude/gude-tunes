import React from "react";
import * as PropTypes from "prop-types";
import { messageActions, messageTypes } from "../Constants";

function Main(props) {
  const {
    hashItems: { access_token },
    updateMessageList,
  } = props;

  return (
    <div>
      <button
        className="shuffleButton"
        onClick={() => {
          fetch("https://api.spotify.com/v1/me/player/shuffle?state=true", {
            method: "PUT",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: `Bearer ${access_token}`,
            },
            body: "",
          })
            .then((response) => {
              updateMessageList(messageActions.CREATE, {
                type: messageTypes.SUCCESS,
                source: "Shuffle",
                text: "Your playback has been shuffled.",
              });
            })
            .catch((error) => {
              updateMessageList(messageActions.CREATE, {
                type: messageTypes.ERROR,
                source: "Shuffle",
                text: "It doesn't seem like that worked.",
              });
            });
        }}
      >
        Activate Shuffle
      </button>
    </div>
  );
}

export default Main;

Main.propTypes = {
  hashItems: PropTypes.object.isRequired,
};
