import React from "react";
import * as PropTypes from "prop-types";
import { request } from "../../Utils";
import { messageActions, messageTypes, candlesTime } from "../../Constants";

const { start, end } = candlesTime;

function CandlesButton(props) {
  const { access_token, updateMessageList, name, text } = props;

  return (
    <div>
      <button
        className="utility-btn candles"
        onClick={() => {
          request("me/player/play", "PUT", access_token, {
            body: JSON.stringify({
              context_uri: "spotify:album:3QrkHSj8pBzE1Kwhpnktkw",
              offset: {
                position: 4,
              },
              position_ms: start,
            }),
          })
            .then((response) => {
              const { status } = response;
              if (status === 204) {
                updateMessageList(messageActions.CREATE, {
                  type: messageTypes.SUCCESS,
                  source: name,
                  text: "Burning sage is cool.",
                });
                setTimeout(() => {
                  request("me/player/pause", "PUT", access_token, {
                    body: "",
                  })
                    .then((response) => {
                      const { status } = response;
                      if (status === 204) {
                        updateMessageList(messageActions.CREATE, {
                          type: messageTypes.INFO,
                          source: name,
                          text: "Don't set off the fire alarm.",
                        });
                      } else {
                        throw status;
                      }
                    })
                    .catch((error) => {
                      updateMessageList(messageActions.CREATE, {
                        type: messageTypes.WARNING,
                        source: name,
                        text: "The song should've been paused here.",
                      });
                    });
                }, end - start);
              } else {
                throw status;
              }
            })
            .catch((error) => {
              updateMessageList(messageActions.CREATE, {
                type: messageTypes.ERROR,
                source: name,
                text: error.message || "It looks like something went awry.",
              });
            });
        }}
      >
        {text}
      </button>
    </div>
  );
}

export default CandlesButton;

CandlesButton.propTypes = {
  access_token: PropTypes.string.isRequired,
  updateMessageList: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
};
