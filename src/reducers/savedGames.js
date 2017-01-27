import { cloneDeep } from 'lodash';

const saveGame = (savedGames, game) => {
  const newGame = cloneDeep(game);
  return savedGames.length < 10 ? [...savedGames, newGame] : [newGame, ...savedGames.slice(-9)];
};

export default saveGame;
