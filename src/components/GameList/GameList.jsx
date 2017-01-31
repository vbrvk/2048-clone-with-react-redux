import React from 'react';
import { hashHistory } from 'react-router';
import { connect } from 'react-redux';
import { Toaster, Position } from '@blueprintjs/core';
import { deleteFromSavedGames, loadGameFromSaved } from '../../actions/gameState';
import GameListItem from '../GameListItem';

const getSize = (blockCount, blockSize, marginSize) => `${(blockSize * blockCount) + (marginSize * (blockCount - 1))}px`;

const Toast = Toaster.create({
  position: Position.BOTTOM_RIGHT,
});
const showToast = message => Toast.show({
  className: 'pt-intent-primary',
  message,
  timeout: 2500,
});

const GameList = ({ games, loadGame, deleteGame }) => (
  <div>
    {games.length === 0 ?
      <h1
        style={{
          textAlign: 'center',
          margin: '100px',
          color: '#182026',
        }}
      >
        You don`t have saved games
      </h1> :
      null
    }
    {games.map((game, index) => (
      <GameListItem
        game={game}
        size={{
          height: getSize(game.size.height, game.blockSize, game.borderWidth),
          width: getSize(game.size.width, game.blockSize, game.borderWidth),
        }}
        onLoad={loadGame(index)}
        onDelete={deleteGame(index)}
      />
    ))}
  </div>
);

GameList.propTypes = {
  games: React.PropTypes.arrayOf(React.PropTypes.shape({
    blocks: React.PropTypes.shape({
      active: React.PropTypes.array,
    }).isRequired,
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
    hashHistory.push('#');
  },
  deleteGame: index => () => {
    dispatch(deleteFromSavedGames(index));
    showToast('Game was successfuly deleted');
  },
}))(GameList);
