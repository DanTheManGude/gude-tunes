import emailjs from "emailjs-com";
import {
  scopesList,
  messageTypes,
  BUTTON_IDS,
  existingUsersMap,
  emailConfig,
  buttonProperties,
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

export const getButtonIdsForUser = (userEmail) => {
  const allButtonIds = Object.keys(BUTTON_IDS);
  switch (existingUsersMap[userEmail]) {
    case 1:
      return allButtonIds;
    case 7:
      return allButtonIds;
    default:
      return allButtonIds.filter(
        (id) =>
          ![
            BUTTON_IDS.SYNC_PLAYLISTS,
            BUTTON_IDS.MYSTERY_DUCK,
            BUTTON_IDS.CANDLES,
            BUTTON_IDS.WBAB,
          ].includes(id)
      );
  }
};

export const makeRequest = (
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

export const getButtonOnClick =
  (buttonId, access_token, addNewMessage = () => {}, userId) =>
  () => {
    buttonProperties[buttonId].function(access_token, addNewMessage, userId);
  };

const getEmailLink = ({ displayName, email }) =>
  `mailto:dgude31@outlook.com?subject=Gude%20Tunes%20Access&body=Hello%2C%0D%0A%0D%0AI%20would%20like%20to%20have%20access%20to%20the%20Gude%20Tunes%20website%20functionality%2C%20but%20the%20request%20button%20did%20not%20work.%20My%20name%20is%2C%20${displayName}%2C%20and%20my%20email%20is%2C%20${email}.%0D%0A%0D%0AThhank%20you!`;

export const getSendEmail = (addNewMessage, userInfo) => () => {
  const messageSource = "Request Access";
  const { serviceId, templateId, userId } = emailConfig;
  emailjs.send(serviceId, templateId, userInfo, userId).then(
    (response) => {
      addNewMessage(
        {
          type: messageTypes.SUCCESS,
          source: messageSource,
          text: "The request was put through. You should recieve a confirmation email shortly (be sure to check your junk folder).",
        },
        10000
      );
    },
    (error) => {
      addNewMessage({
        type: messageTypes.ERROR,
        source: messageSource,
        text: (
          <span>
            The request was unsuccessful. You can reach out to&nbsp;
            <a href={getEmailLink(userInfo)}>dgude31@outlook.com</a>
            &nbsp;directly.
          </span>
        ),
      });
    }
  );
};

export const requestPlaylistUris = (playlistId, access_token) =>
  makeRequest(`playlists/${playlistId}`, "GET", access_token)
    .then((resp) => {
      const { status: statusCode } = resp;
      if (statusCode !== 200) {
        throw resp;
      }
      return resp.json();
    })
    .then(({ tracks: { items } }) => items.map((item) => item.track.uri));

export const getAddErrorMessage = (addNewMessage, source) => (error) => {
  addNewMessage({
    type: messageTypes.ERROR,
    source,
    text: error.message || "It looks like something went awry.",
  });
};
