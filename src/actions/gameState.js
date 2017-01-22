import { actionTypes } from '../constants';

export const newGame = () => ({
  type: actionTypes.NEW_GAME,
});

export const continueGame = () => ({
  type: actionTypes.CONTINUE_GAME,
});


export default { newGame, continueGame };
