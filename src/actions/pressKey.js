import { actionTypes } from '../constants';

const pressDownKey = () => ({
  type: actionTypes.PRESS_DOWN_KEY,
  vector: {
    x: 0, y: 1,
  },
});

const pressUpKey = () => ({
  type: actionTypes.PRESS_UP_KEY,
  vector: {
    x: 0, y: -1,
  },
});

const pressRightKey = () => ({
  type: actionTypes.PRESS_RIGHT_KEY,
  vector: {
    x: 1, y: 0,
  },
});

const pressLeftKey = () => ({
  type: actionTypes.PRESS_LEFT_KEY,
  vector: {
    x: -1, y: 0,
  },
});

export default { pressUpKey, pressDownKey, pressRightKey, pressLeftKey };
