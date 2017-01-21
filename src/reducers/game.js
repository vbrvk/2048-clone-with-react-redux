import { actionTypes, GAME_STATUS } from '../constants';
import blocks from './blocks';
import { setNewRandomElement, getNewBlock } from './helpers';

const defaultState = {
  width: 4,
  blockSize: 100,
  height: 4,
  blocks: [],
  borderWidth: 10,
  score: 0,
  status: GAME_STATUS.PLAY,
};


for (let y = 0; y < defaultState.height; ++y) { // eslint-disable-line
  defaultState.blocks.push([]);
  for (let x = 0; x < defaultState.width; ++x) { //eslint-disable-line
    defaultState.blocks[y].push(getNewBlock({ x, y }));
  }
}

defaultState.blocks = setNewRandomElement(setNewRandomElement(defaultState.blocks));

export default (state = defaultState, action) => {
  switch (action.type) {
    case (actionTypes.PRESS_DOWN_KEY):
    case (actionTypes.PRESS_UP_KEY):
    case (actionTypes.PRESS_RIGHT_KEY):
    case (actionTypes.PRESS_LEFT_KEY):
    case ('NORMALIZE'):
      return blocks(state, action);
    default: return state;
  }
};
