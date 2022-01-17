import {
  shuffleFunction,
  saturdayFunction,
  mysteryDuckFunction,
  candlesFunction,
  bostonFunction,
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

export const buttonIds = {
  SHUFFLE: "SHUFFLE",
  SATURDAY: "SATURDAY",
  MYSTERY_DUCK: "MYSTERY_DUCK",
  CANDLES: "CANDLES",
  BOSTON: "BOSTON",
};

export const buttonProperties = {
  [buttonIds.SHUFFLE]: createProperty(
    "Activate Shuffle",
    "Shuffle",
    shuffleFunction
  ),
  [buttonIds.SATURDAY]: createProperty(
    "Is it Saturday?",
    "Saturday",
    saturdayFunction
  ),
  MYSTERY_DUCK: createProperty(
    "Mystery 🦆",
    "Mystery Love",
    mysteryDuckFunction
  ),
  [buttonIds.CANDLES]: createProperty(
    "Don't light candles",
    "Candles",
    candlesFunction
  ),
  [buttonIds.BOSTON]: createProperty(
    "Boston Bound",
    "Boston Bound",
    bostonFunction
  ),
};

export const candlesTime = { start: 13930, end: 21200 };

export const emailConfig = {
  serviceId: "service_sbv0ia4",
  templateId: "template_fe1e5ws",
  userId: "user_2K4sBJkaEW2m7T8CPrYhp",
};
