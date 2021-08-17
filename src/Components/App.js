import React from "react";
import Main from "./Main";
import { scopesList } from "../Constants";

const requestAuth = () => {
  const redirectUri = encodeURIComponent(window.location.href);
  const scopes = scopesList.join("%20");
  window.location.href = `https://accounts.spotify.com/authorize?client_id=125aeb2f61c242c68fe33802c481bb08&redirect_uri=${redirectUri}&scope=${scopes}&response_type=token&state=202102121300`;
};

const calculateAuthorization = () => {
  console.log(window.location);

  const urlSearchParams = new URLSearchParams(window.location.search);
  const params = Object.fromEntries(urlSearchParams.entries());
  if (params.hasOwnProperty("error")) {
    return -1;
  }

  if (!window.location.hash) {
    return 0;
  }

  const hashItems = window.location.hash
    .substr(1)
    .split("&")
    .reduce((acc, element) => {
      const parts = element.split("=");
      acc[parts[0]] = parts[1];
      return acc;
    }, {});

  if (hashItems.hasOwnProperty("access_token")) {
    return hashItems;
  }
};

function App() {
  const authorization = calculateAuthorization();

  if (authorization === -1) {
    return (
      <p className="regText errorText">
        Sorry, it looks like an error occurred
      </p>
    );
  }

  if (authorization === 0) {
    return (
      <div>
        <p className="regText">Please login below to use the app</p>
        <button className="regText authButton" onClick={requestAuth}>
          Login
        </button>
      </div>
    );
  }

  return <Main hashItems={authorization} />;
}

export default App;
