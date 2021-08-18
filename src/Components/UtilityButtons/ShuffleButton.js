import React from "react";
import * as PropTypes from "prop-types";
import { request } from "../../Utils";
import { messageActions, messageTypes } from "../../Constants";

function ShuffleButton(props) {
  const { access_token, updateMessageList, name, text } = props;

  return (
    <div>
      <button
        className="utility-btn shuffle"
        onClick={() => {
          request("me/player/shuffle?state=true", "PUT", access_token, {
            body: "",
          })
            .then((response) => {
              const { status } = response;
              if (status === 204) {
                updateMessageList(messageActions.CREATE, {
                  type: messageTypes.SUCCESS,
                  source: name,
                  text: "Your playback has been shuffled.",
                });
              } else {
                throw status;
              }
            })
            .catch((error) => {
              updateMessageList(messageActions.CREATE, {
                type: messageTypes.ERROR,
                source: name,
                text: "That didn't work; your playback was unchanged.",
              });
            });
        }}
      >
        {text}
      </button>
    </div>
  );
}

export default ShuffleButton;

ShuffleButton.propTypes = {
  access_token: PropTypes.string.isRequired,
  updateMessageList: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
};
