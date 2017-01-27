import keymirror from 'key-mirror';

export const actionTypes = keymirror({
  PRESS_LEFT_KEY: null,
  PRESS_RIGHT_KEY: null,
  PRESS_UP_KEY: null,
  PRESS_DOWN_KEY: null,
  NEW_GAME: null,
  CONTINUE_GAME: null,
  SAVE_GAME: null,
});

export const VECTORS = {
  LEFT: {
    x: -1, y: 0,
  },
  RIGHT: {
    x: 1, y: 0,
  },
  UP: {
    x: 0, y: -1,
  },
  DOWN: {
    x: 0, y: 1,
  },
};

export const KEY_CODES = {
  UP: 38,
  DOWN: 40,
  LEFT: 37,
  RIGHT: 39,
  ALL_CODES: [37, 38, 39, 40],
};

export const GAME_STATUS = keymirror({
  PLAY: null,
  LOSE: null,
  WIN: null,
});

export default { actionTypes, KEY_CODES, GAME_STATUS, VECTORS };
