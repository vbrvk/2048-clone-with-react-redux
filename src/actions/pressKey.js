import { actionTypes, VECTORS } from '../constants';

const pressDownKey = () => ({
  type: actionTypes.PRESS_DOWN_KEY,
  vector: VECTORS.DOWN,
});

const pressUpKey = () => ({
  type: actionTypes.PRESS_UP_KEY,
  vector: VECTORS.UP,
});

const pressRightKey = () => ({
  type: actionTypes.PRESS_RIGHT_KEY,
  vector: VECTORS.RIGHT,
});

const pressLeftKey = () => ({
  type: actionTypes.PRESS_LEFT_KEY,
  vector: VECTORS.LEFT,
});

export default { pressUpKey, pressDownKey, pressRightKey, pressLeftKey };
