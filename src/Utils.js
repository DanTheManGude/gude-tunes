import {
  scopesList,
  messageActions,
  messageTypes,
  candlesTime,
} from "./Constants";

export const calculateAuthentication = () => {
  const authentication = { code: null, hashItems: {}, message: "" };

  const urlSearchParams = new URLSearchParams(window.location.search);
  const params = Object.fromEntries(urlSearchParams.entries());

  if (params.hasOwnProperty("error")) {
    authentication.code = -1;
    authentication.message = params.error;
  } else if (!window.location.hash) {
    authentication.code = 0;
    authentication.message = "Missing hash in the url";
  } else {
    const hashItems = window.location.hash
      .substr(1)
      .split("&")
      .reduce((acc, element) => {
        const parts = element.split("=");
        acc[parts[0]] = parts[1];
        return acc;
      }, {});
    if (hashItems.hasOwnProperty("access_token")) {
      authentication.code = 1;
      authentication.hashItems = hashItems;
    } else {
      authentication.code = -1;
      authentication.message = "Hash does not include access_token";
    }
  }

  return authentication;
};

export const requestAuth = () => {
  const redirectUri = encodeURIComponent(window.location.href);
  const scopes = scopesList.join("%20");
  window.location.href = `https://accounts.spotify.com/authorize?client_id=125aeb2f61c242c68fe33802c481bb08&redirect_uri=${redirectUri}&scope=${scopes}&response_type=token&state=202102121300`;
};

export const request = (path, method = "GET", access_token, fields = {}) =>
  fetch(`https://api.spotify.com/v1/${path}`, {
    method,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${access_token}`,
    },
    ...fields,
  });

const buttonFunctions = {
  SHUFFLE: (access_token, updateMessageList, name) =>
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
      }),
  CANDLES: (access_token, updateMessageList, name) => {
    const { start, end } = candlesTime;

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
  },
};

export const getButtonOnClick =
  (buttonId, access_token, updateMessageList = () => {}, name = "") =>
  () =>
    buttonFunctions[buttonId](access_token, updateMessageList, name);
