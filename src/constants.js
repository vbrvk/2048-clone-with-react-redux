import keymirror from 'key-mirror';

export const actionTypes = keymirror({
  PRESS_LEFT_KEY: null,
  PRESS_RIGHT_KEY: null,
  PRESS_UP_KEY: null,
  PRESS_DOWN_KEY: null,
});

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
  WON: null,
});

export default { actionTypes, KEY_CODES, GAME_STATUS };
