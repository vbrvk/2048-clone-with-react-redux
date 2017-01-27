import { getNewGameState, getNewBlocksAfterKeyPress } from './currentGame';
import saveGame from './savedGames';
import { actionTypes, GAME_STATUS } from '../constants';


const defaultState = {
  currentGame: getNewGameState(),
  saved: [],
};


export default (state = defaultState, action) => {
  switch (action.type) {
    case (actionTypes.PRESS_DOWN_KEY):
    case (actionTypes.PRESS_UP_KEY):
    case (actionTypes.PRESS_RIGHT_KEY):
    case (actionTypes.PRESS_LEFT_KEY):
      return {
        ...state,
        currentGame: (getNewBlocksAfterKeyPress(state.currentGame, action.vector)),
      };
    case (actionTypes.NEW_GAME):
      return {
        ...state,
        currentGame: {
          ...getNewGameState(),
          bestScore: state.currentGame.bestScore,
        },
      };
    case (actionTypes.CONTINUE_GAME):
      return {
        ...state,
        currentGame: {
          ...state.currentGame,
          status: GAME_STATUS.PLAY,
        },
      };
    case (actionTypes.SAVE_GAME):
      return {
        ...state,
        saved: saveGame(state.saved, state.currentGame),
      };
    default: return state;
  }
};
