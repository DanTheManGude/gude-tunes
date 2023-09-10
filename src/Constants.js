import {
  shuffleFunction,
  saturdayFunction,
  mysteryDuckFunction,
  candlesFunction,
  bostonFunction,
  syncPlaylistsFunction,
  wbabFunction,
} from "./ButtonFunctions";

export const existingUsersMap = {
  "dgude31@gmail.com": 1,
  "emtemple211@gmail.com": 7,
};

const createUserPlaylistValue = (selfPlaylist, otherUserId) => ({
  selfPlaylist,
  otherUserId,
});

export const userPlaylistMap = {
  1: createUserPlaylistValue("5zWTsTMwKffVVwnB3V04cW", 7),
  7: createUserPlaylistValue("5gR6gvNGivsJJA5bMwolTU", 1),
};

export const scopesList = [
  "user-read-private",
  "user-read-email",
  "user-modify-playback-state",
  "playlist-modify-public",
];

export const messageTypes = {
  SUCCESS: "SUCCESS",
  ERROR: "ERROR",
  INFO: "INFO",
  WARNING: "WARNING",
};

const createProperty = (text, name, func, classNames = []) => {
  return { text, name, function: func(name), classNames };
};

export const BUTTON_IDS = {
  SHUFFLE: "SHUFFLE",
  SATURDAY: "SATURDAY",
  WBAB: "WBAB",
  MYSTERY_DUCK: "MYSTERY_DUCK",
  CANDLES: "CANDLES",
  BOSTON: "BOSTON",
  SYNC_PLAYLISTS: "SYNC_PLAYLISTS",
};

export const buttonProperties = {
  [BUTTON_IDS.SHUFFLE]: createProperty(
    "Activate Shuffle",
    "Shuffle",
    shuffleFunction
  ),
  [BUTTON_IDS.SATURDAY]: createProperty(
    "Is it Saturday?",
    "Saturday",
    saturdayFunction
  ),
  MYSTERY_DUCK: createProperty(
    "Mystery 🦆",
    "Mystery Love",
    mysteryDuckFunction
  ),
  [BUTTON_IDS.CANDLES]: createProperty(
    "Don't light candles",
    "Candles",
    candlesFunction
  ),
  [BUTTON_IDS.BOSTON]: createProperty(
    "Boston Bound",
    "Boston Bound",
    bostonFunction
  ),
  [BUTTON_IDS.SYNC_PLAYLISTS]: createProperty(
    "Sync Playlists",
    "Sync Playlists",
    syncPlaylistsFunction,
    ["sync-playlist-btn"]
  ),
  [BUTTON_IDS.WBAB]: createProperty("Play from WBAB", "WBAB", wbabFunction),
};

export const candlesTime = { start: 13930, end: 21200 };

export const emailConfig = {
  serviceId: "service_sbv0ia4",
  templateId: "template_fe1e5ws",
  userId: "user_2K4sBJkaEW2m7T8CPrYhp",
};
