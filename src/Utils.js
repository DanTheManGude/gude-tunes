import {
  scopesList,
  messageTypes,
  activeButtonIds,
  existingUsersMap,
  BUTTON_IDS,
  buttonProperties,
} from "./Constants";

const SPOTIFY_CLIENT_ID = "125aeb2f61c242c68fe33802c481bb08";
const SPOTIFY_AUTHORIZE_URL = "https://accounts.spotify.com/authorize";
const SPOTIFY_TOKEN_URL = "https://accounts.spotify.com/api/token";
const AUTH_STATE_KEY = "spotify-auth-state";
const AUTH_VERIFIER_KEY = "spotify-auth-verifier";
const AUTH_REDIRECT_URI_KEY = "spotify-auth-redirect-uri";
const ACCESS_TOKEN_KEY = "spotify-access-token";

const generateRandomString = (length) => {
  const alphabet =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const values = window.crypto.getRandomValues(new Uint8Array(length));

  return Array.from(values, (value) => alphabet[value % alphabet.length]).join(
    "",
  );
};

const base64UrlEncode = (value) => {
  const encoded = btoa(String.fromCharCode(...new Uint8Array(value)));
  return encoded.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
};

const createCodeChallenge = async (codeVerifier) => {
  const digest = await window.crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(codeVerifier),
  );
  return base64UrlEncode(digest);
};

const parseHashItems = (hashValue) =>
  hashValue
    .substr(1)
    .split("&")
    .reduce((acc, element) => {
      if (!element) {
        return acc;
      }

      const [key, ...rest] = element.split("=");
      acc[key] = rest.join("=");
      return acc;
    }, {});

export const getRedirectUri = () =>
  `${window.location.origin}${window.location.pathname}`;

export const buildSpotifyAuthUrl = ({
  clientId,
  redirectUri,
  scopes,
  state,
  codeChallenge,
}) => {
  const params = [
    `response_type=code`,
    `client_id=${encodeURIComponent(clientId)}`,
    `redirect_uri=${encodeURIComponent(redirectUri)}`,
    `scope=${encodeURIComponent(scopes.join(" "))}`,
    `state=${encodeURIComponent(state)}`,
    `code_challenge=${encodeURIComponent(codeChallenge)}`,
    "code_challenge_method=S256",
  ];

  return `${SPOTIFY_AUTHORIZE_URL}?${params.join("&")}`;
};

export const calculateAuthentication = async () => {
  const authentication = { code: null, accessToken: null, message: "" };

  const urlSearchParams = new URLSearchParams(window.location.search);
  const params = Object.fromEntries(urlSearchParams.entries());

  if (params.hasOwnProperty("error")) {
    authentication.code = -1;
    authentication.message = params.error;
    return authentication;
  }

  const storedAccessToken = sessionStorage.getItem(ACCESS_TOKEN_KEY);
  if (storedAccessToken) {
    authentication.code = 1;
    authentication.accessToken = storedAccessToken;
    return authentication;
  }

  const authCode = params.code;
  if (!authCode) {
    if (window.location.hash) {
      const hashItems = parseHashItems(window.location.hash);
      if (hashItems.access_token) {
        authentication.code = 1;
        authentication.accessToken = hashItems.access_token;
        sessionStorage.setItem(ACCESS_TOKEN_KEY, hashItems.access_token);
        return authentication;
      }
    }

    authentication.code = 0;
    authentication.message = "Missing authorization code in the url";
    return authentication;
  }

  const state = params.state;
  const expectedState = sessionStorage.getItem(AUTH_STATE_KEY);
  const codeVerifier = sessionStorage.getItem(AUTH_VERIFIER_KEY);
  const redirectUri =
    sessionStorage.getItem(AUTH_REDIRECT_URI_KEY) || getRedirectUri();

  if (!expectedState || !codeVerifier || state !== expectedState) {
    authentication.code = -1;
    authentication.message = "Unable to verify Spotify login request";
    return authentication;
  }

  try {
    const tokenResponse = await fetch(SPOTIFY_TOKEN_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        client_id: SPOTIFY_CLIENT_ID,
        grant_type: "authorization_code",
        code: authCode,
        redirect_uri: redirectUri,
        code_verifier: codeVerifier,
      }),
    });

    const tokenBody = await tokenResponse.json();

    if (!tokenResponse.ok) {
      throw new Error(
        tokenBody.error_description ||
          tokenBody.error ||
          "Unable to complete Spotify login",
      );
    }

    if (!tokenBody.access_token) {
      throw new Error("Spotify did not return an access token");
    }

    sessionStorage.setItem(ACCESS_TOKEN_KEY, tokenBody.access_token);
    if (tokenBody.refresh_token) {
      sessionStorage.setItem("spotify-refresh-token", tokenBody.refresh_token);
    }

    sessionStorage.removeItem(AUTH_STATE_KEY);
    sessionStorage.removeItem(AUTH_VERIFIER_KEY);
    sessionStorage.removeItem(AUTH_REDIRECT_URI_KEY);
    window.history.replaceState({}, document.title, window.location.pathname);

    authentication.code = 1;
    authentication.accessToken = tokenBody.access_token;
  } catch (error) {
    authentication.code = -1;
    authentication.message =
      error.message || "Unable to complete Spotify login";
  }

  return authentication;
};

export const requestAuth = async () => {
  const redirectUri = getRedirectUri();
  const state = generateRandomString(16);
  const codeVerifier = generateRandomString(64);
  const codeChallenge = await createCodeChallenge(codeVerifier);

  sessionStorage.setItem(AUTH_STATE_KEY, state);
  sessionStorage.setItem(AUTH_VERIFIER_KEY, codeVerifier);
  sessionStorage.setItem(AUTH_REDIRECT_URI_KEY, redirectUri);

  window.location.href = buildSpotifyAuthUrl({
    clientId: SPOTIFY_CLIENT_ID,
    redirectUri,
    scopes: scopesList,
    state,
    codeChallenge,
  });
};

export const getButtonIdsForUser = (userEmail) => {
  switch (existingUsersMap[userEmail]) {
    case 1:
      return activeButtonIds;
    case 7:
      return activeButtonIds;
    default:
      return activeButtonIds.filter(
        (id) =>
          ![
            BUTTON_IDS.SYNC_PLAYLISTS,
            BUTTON_IDS.MYSTERY_DUCK,
            BUTTON_IDS.CANDLES,
            BUTTON_IDS.WBAB,
            BUTTON_IDS.SHARK,
          ].includes(id),
      );
  }
};

export const makeRequest = (
  path,
  method = "GET",
  access_token,
  fields = {},
  queryParams = "",
) =>
  fetch(
    `https://api.spotify.com/v1/${path}${
      queryParams &&
      Object.keys(queryParams).reduce(
        (acc, element, index) =>
          `${acc}${index === 0 ? "?" : "&"}${element}=${queryParams[element]}`,
        "",
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
    },
  );

export const getButtonOnClick =
  (buttonId, access_token, addNewMessage = () => {}, userId) =>
  () => {
    buttonProperties[buttonId].function(access_token, addNewMessage, userId);
  };

const getEmailLink = ({ displayName, email }) =>
  `mailto:dgude31@outlook.com?subject=Gude%20Tunes%20Access&body=Hello%2C%0D%0A%0D%0AI%20would%20like%20to%20have%20access%20to%20the%20Gude%20Tunes%20website%20functionality%2C%20but%20the%20request%20button%20did%20not%20work.%20My%20name%20is%2C%20${displayName}%2C%20and%20my%20email%20is%2C%20${email}.%0D%0A%0D%0AThhank%20you!`;

export const getSendEmail = (addNewMessage, userInfo) => () => {
  addNewMessage({
    type: messageTypes.WARNING,
    source: "Request Access",
    text: (
      <span>
        Reach out to&nbsp;
        <a href={getEmailLink(userInfo)}>dgude31@outlook.com</a>
        &nbsp;to request access.
      </span>
    ),
  });
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
