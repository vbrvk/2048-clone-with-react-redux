import React from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { deleteFromSavedGames, loadGameFromSaved } from '../../actions/gameState';
import GameListItem from '../GameListItem';

const getSize = (blockCount, blockSize, marginSize) => `${(blockSize * blockCount) + (marginSize * (blockCount - 1))}px`;

const GameList = ({ games, loadGame, deleteGame }) => (
  <div>
    {games.map((game, index) => (
      <GameListItem
        game={game}
        size={{
          height: getSize(game.height, game.blockSize, game.borderWidth),
          width: getSize(game.width, game.blockSize, game.borderWidth),
        }}
        onLoad={loadGame(index)}
        onDelete={deleteGame(index)}
      />
    ))}
  </div>
);

GameList.propTypes = {
  games: React.PropTypes.arrayOf(React.PropTypes.shape({
    blocks: React.PropTypes.arrayOf(React.PropTypes.array).isRequired,
    score: React.PropTypes.number.isRequired,
    bestScore: React.PropTypes.number.isRequired,
    blockSize: React.PropTypes.number.isRequired,
    borderWidth: React.PropTypes.number.isRequired,
  })).isRequired,
  loadGame: React.PropTypes.func.isRequired,
  deleteGame: React.PropTypes.func.isRequired,
};

export default connect(state => ({
  games: state.games.saved,
}), dispatch => ({
  loadGame: index => () => {
    dispatch(loadGameFromSaved(index));
    browserHistory.push('/');
  },
  deleteGame: index => () => dispatch(deleteFromSavedGames(index)),
}))(GameList);
