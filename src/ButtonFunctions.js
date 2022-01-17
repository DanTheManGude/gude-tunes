import { makeRequest, requestPlaylistUris } from "./Utils";
import { messageTypes, candlesTime, userPlaylistMap } from "./Constants";

export const shuffleFunction = (name) => (access_token, addNewMessage) =>
  makeRequest("me/player/shuffle?state=true", "PUT", access_token, {
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
        throw response;
      }
    })
    .catch((error) => {
      addNewMessage({
        type: messageTypes.ERROR,
        source: name,
        text: "That didn't work; your playback was unchanged.",
      });
    });

export const candlesFunction = (name) => (access_token, addNewMessage) => {
  const { start, end } = candlesTime;

  makeRequest("me/player/play", "PUT", access_token, {
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
          makeRequest("me/player/pause", "PUT", access_token, {
            body: "",
          })
            .then((resp) => {
              const { status: statusCode } = resp;
              if (statusCode === 204) {
                addNewMessage({
                  type: messageTypes.INFO,
                  source: name,
                  text: "Don't set off the fire alarm.",
                });
              } else {
                throw resp;
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
        throw response;
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

export const bostonFunction = (name) => (access_token, addNewMessage) => {
  makeRequest("me/player/queue", "POST", access_token, undefined, {
    uri: "spotify:track:7rSERmjAT38lC5QhJ8hnQc",
  })
    .then((response) => {
      const { status } = response;
      if (status === 204) {
        makeRequest("me/player/next", "POST", access_token, {
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
            throw response;
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

var playSaturday = false;
export const saturdayFunction = (name) => (access_token, addNewMessage) => {
  const day = new Date().getDay();

  switch (day) {
    case 1:
      addNewMessage({
        type: messageTypes.INFO,
        source: name,
        text: "It is not Satuday. It is Monday, slow down.",
      });
      break;
    case 3:
      addNewMessage({
        type: messageTypes.INFO,
        source: name,
        text: "It is not Satuday. It is Wednesday, not a sound.",
      });
      break;
    case 5:
      addNewMessage({
        type: messageTypes.INFO,
        source: name,
        text: "It is not Satuday. It is Friday, might get loud.",
      });
      break;
    case 6:
      addNewMessage({
        type: messageTypes.INFO,
        source: name,
        text: "It is Satuday. We paint the town!",
      });
      playSaturday = true;
      break;
    default:
      if (!playSaturday) {
        addNewMessage({
          type: messageTypes.INFO,
          source: name,
          text: "It is not Satuday. Have you lost your sense of time or two?",
        });
      }
      break;
  }

  if (playSaturday) {
    makeRequest("me/player/play", "PUT", access_token, {
      body: JSON.stringify({
        context_uri: "spotify:album:0Q5XBpCYFgUWiG9DUWyAmJ",
        offset: {
          position: 4,
        },
      }),
    })
      .then((response) => {
        const { status } = response;
        if (status === 204) {
          addNewMessage({
            type: messageTypes.SUCCESS,
            source: name,
            text: "Life moves slow on the ocean floor (feeling great)",
          });
        } else {
          throw response;
        }
      })
      .catch((error) => {
        addNewMessage({
          type: messageTypes.ERROR,
          source: name,
          text: error.message || "It looks like something went awry.",
        });
      });
  }
  playSaturday = true;
};

export const mysteryDuckFunction =
  (name) => (access_token, addNewMessage, userId) => {
    const { selfPlaylist } = userPlaylistMap[userId];

    makeRequest(`playlists/${selfPlaylist}`, "GET", access_token)
      .then((r) => r.json())
      .then((response) => {
        const { tracks } = response;
        const { total, items } = tracks;
        const trackIndex = Date.now() % total;
        const trackURI = items[trackIndex].track.uri;
        makeRequest("me/player/queue", "POST", access_token, undefined, {
          uri: trackURI,
        })
          .then((resp) => {
            const { status } = resp;
            if (status !== 204) {
              throw resp;
            }
            addNewMessage({
              type: messageTypes.SUCCESS,
              source: name,
              text: "A random song from our friends has been added to the queue. <3",
            });
          })
          .catch((error) => {
            throw error;
          });
      })
      .catch((error) => {
        addNewMessage({
          type: messageTypes.ERROR,
          source: name,
          text: error.message || "It looks like something went awry.",
        });
      });
  };

export const syncPlaylistsFunction =
  (name) => (access_token, addNewMessage, userId) => {
    const { selfPlaylist, otherUserId } = userPlaylistMap[userId];
    const { selfPlaylist: otherPlaylist } = userPlaylistMap[otherUserId];

    Promise.all([
      requestPlaylistUris(selfPlaylist, access_token),
      requestPlaylistUris(otherPlaylist, access_token),
    ])
      .then(([selfUris, otherUris]) => {
        const toAddUris = otherUris.filter((uri) => !selfUris.includes(uri));
        makeRequest(`playlists/${selfPlaylist}/tracks`, "POST", access_token, {
          body: JSON.stringify({
            uris: toAddUris,
          }),
        })
          .then((response) => {
            const { status } = response;
            if (status !== 201) {
              throw response;
            }
            addNewMessage({
              type: messageTypes.SUCCESS,
              source: name,
              text: "Our playlists have been synced.",
            });
          })
          .catch((error) => {
            throw error;
          });
      })
      .catch((error) => {
        addNewMessage({
          type: messageTypes.ERROR,
          source: name,
          text: error.message || "It looks like something went awry.",
        });
      });
  };
