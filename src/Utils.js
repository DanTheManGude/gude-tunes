import emailjs from "emailjs-com";
import {
  scopesList,
  messageTypes,
  candlesTime,
  emailServiceId,
  templateId,
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

export const request = (
  path,
  method = "GET",
  access_token,
  fields = {},
  queryParams = ""
) =>
  fetch(
    `https://api.spotify.com/v1/${path}${
      queryParams &&
      Object.keys(queryParams).reduce(
        (acc, element, index) =>
          `${acc}${index === 0 ? "?" : "&"}${element}=${queryParams[element]}`,
        ""
      )
    }`,
    {
      method,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${access_token}`,
      },
      ...fields,
    }
  );

const shuffleFunction = (access_token, addNewMessage, name) =>
  request("me/player/shuffle?state=true", "PUT", access_token, {
    body: "",
  })
    .then((response) => {
      const { status } = response;
      if (status === 204) {
        addNewMessage({
          type: messageTypes.SUCCESS,
          source: name,
          text: "Your playback has been shuffled.",
        });
      } else {
        throw status;
      }
    })
    .catch((error) => {
      addNewMessage({
        type: messageTypes.ERROR,
        source: name,
        text: "That didn't work; your playback was unchanged.",
      });
    });

const candlesFunction = (access_token, addNewMessage, name) => {
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
        addNewMessage({
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
                addNewMessage({
                  type: messageTypes.INFO,
                  source: name,
                  text: "Don't set off the fire alarm.",
                });
              } else {
                throw status;
              }
            })
            .catch((error) => {
              addNewMessage({
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
      addNewMessage({
        type: messageTypes.ERROR,
        source: name,
        text: error.message || "It looks like something went awry.",
      });
    });
};

const bostonFunction = (access_token, addNewMessage, name) => {
  request("me/player/queue", "POST", access_token, undefined, {
    uri: "spotify:track:7rSERmjAT38lC5QhJ8hnQc",
  })
    .then((response) => {
      const { status } = response;
      if (status === 204) {
        request("me/player/next", "POST", access_token, {
          body: "",
        }).then((response) => {
          const { status } = response;
          if (status === 204) {
            addNewMessage({
              type: messageTypes.SUCCESS,
              source: name,
              text: "Safe travels.",
            });
          } else {
            throw status;
          }
        });
      }
    })
    .catch((error) => {
      addNewMessage({
        type: messageTypes.ERROR,
        source: name,
        text: error.message || "It looks like your package is delayed.",
      });
    });
};

const buttonFunctions = {
  SHUFFLE: shuffleFunction,
  CANDLES: candlesFunction,
  BOSTON: bostonFunction,
};

export const getButtonOnClick =
  (buttonId, access_token, addNewMessage = () => {}, name = "") =>
  () =>
    buttonFunctions[buttonId](access_token, addNewMessage, name);

const getEmailLink = ({ displayName, email }) =>
  `mailto:dgude31@outlook.com?subject=Gude%20Tunes%20Access&body=Hello%2C%0D%0A%0D%0AI%20would%20like%20to%20have%20access%20to%20the%20Gude%20Tunes%20website%20functionality%2C%20but%20the%20request%20button%20did%20not%20work.%20My%20name%20is%2C${displayName}%2C%20and%20my%20email%20is%2C${email}.%0D%0A%0D%0AThhank%20you!`;

export const getSendEmail = (addNewMessage, userInfo) => {
  const messageSource = "Request Access";
  emailjs.send(emailServiceId, templateId, userInfo).then(
    (response) => {
      addNewMessage({
        type: messageTypes.SUCCESS,
        source: messageSource,
        text: "The request was put through. You should recieve a confirmation email shortly.",
      });
    },
    (error) => {
      addNewMessage({
        type: messageTypes.ERROR,
        source: messageSource,
        text: `The request was unsuccessful. You can reach out to <a href="mailto:${getEmailLink(
          userInfo
        )}">dgude31@outlook.com</a> directly.`,
      });
    }
  );
};
