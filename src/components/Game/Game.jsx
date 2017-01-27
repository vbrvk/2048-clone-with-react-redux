import React from 'react';
import { connect } from 'react-redux';
import { Alert } from '@blueprintjs/core';
import '@blueprintjs/core/dist/blueprint.css';

import { KEY_CODES, GAME_STATUS } from '../../constants';
import actions from '../../actions';
import Grid from '../Grid';
import Header from '../Header';


class Game extends React.Component {
  constructor() {
    super();
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.getSize = this.getSize.bind(this);
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyPress);
    this.handleSwipe();
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyPress);
    document.removeEventListener('touchstart', this.touchstartHandle);
    document.removeEventListener('touchend', this.touchendHandle);
  }

  getSize(size) {
    return `${(this.props.game.blockSize * this.props.game[size]) + (this.props.game.borderWidth * (this.props.game[size] - 1))}px`;
  }

  handleSwipe() {
    let touchstartX = 0;
    let touchstartY = 0;
    let touchendX = 0;
    let touchendY = 0;

    const handleGesure = () => {
      if (touchstartX - touchendX > 20) {
        this.props.onKeyPress.Left();
      }
      if (touchendX - touchstartX > 20) {
        this.props.onKeyPress.Right();
      }
      if (touchstartY - touchendY > 20) {
        this.props.onKeyPress.Up();
      }
      if (touchendY - touchstartY > 20) {
        this.props.onKeyPress.Down();
      }
    };


    this.touchstartHandle = (event) => {
      event.preventDefault();
      touchstartX = event.changedTouches[0].screenX;
      touchstartY = event.changedTouches[0].screenY;
    };
    this.touchendHandle = (event) => {
      event.preventDefault();
      touchendX = event.changedTouches[0].screenX;
      touchendY = event.changedTouches[0].screenY;
      handleGesure();
    };
    document.addEventListener('touchstart', this.touchstartHandle);
    document.addEventListener('touchend', this.touchendHandle);
  }

  handleKeyPress(e) {
    if (KEY_CODES.ALL_CODES.includes(e.keyCode)) e.preventDefault();
    switch (e.keyCode) {
      case (KEY_CODES.UP): this.props.onKeyPress.Up();
        break;
      case (KEY_CODES.DOWN): this.props.onKeyPress.Down();
        break;
      case (KEY_CODES.LEFT): this.props.onKeyPress.Left();
        break;
      case (KEY_CODES.RIGHT): this.props.onKeyPress.Right();
        break;
      default: break;
    }
  }
  render() {
    const { game } = this.props;
    const size = {
      width: this.getSize('width'),
      height: this.getSize('height'),
    };
    let alertText;
    let alertButtonText;
    switch (game.status) { // eslint-disable-line
      case GAME_STATUS.WIN:
        alertText = `You win. Score: ${game.score}`;
        alertButtonText = 'Continue';
        break;
      case GAME_STATUS.LOSE:
        alertText = `Game over. Score: ${game.score}`;
        alertButtonText = 'Try again';
        break;
    }
    return (
      <div>
        <Header
          width={`${parseInt(size.width, 10) + (2 * game.borderWidth)}px`}
          score={game.score}
          bestScore={game.bestScore}
          newGame={this.props.newGame}
          savedGamesCount={this.props.savedGamesCount}
          saveGame={this.props.saveGame}
        />
        <Grid
          width={size.width}
          height={size.height}
          game={this.props.game}
        />
        <Alert
          isOpen={game.status !== GAME_STATUS.PLAY}
          confirmButtonText={alertButtonText}
          onConfirm={
            game.status === GAME_STATUS.LOSE ?
            this.props.newGame : this.props.continueGame
          }
        >{alertText}</Alert>
      </div>
    );
  }
}

Game.propTypes = {
  onKeyPress: React.PropTypes.shape({
    Up: React.PropTypes.func,
    Down: React.PropTypes.func,
    Left: React.PropTypes.func,
    Right: React.PropTypes.func,
  }).isRequired,
  newGame: React.PropTypes.func.isRequired,
  continueGame: React.PropTypes.func.isRequired,
  saveGame: React.PropTypes.func.isRequired,
  savedGamesCount: React.PropTypes.number.isRequired,
  game: React.PropTypes.shape({
    blocks: React.PropTypes.arrayOf(React.PropTypes.array).isRequired,
    score: React.PropTypes.number.isRequired,
    bestScore: React.PropTypes.number.isRequired,
    blockSize: React.PropTypes.number.isRequired,
    borderWidth: React.PropTypes.number.isRequired,
  }).isRequired,
};

export default connect(state => ({
  game: state.games.currentGame,
  savedGamesCount: state.games.saved.length,
}), dispatch => ({
  onKeyPress: {
    Up: () => {
      dispatch(actions.pressUpKey());
    },
    Down: () => {
      dispatch(actions.pressDownKey());
    },
    Left: () => {
      dispatch(actions.pressLeftKey());
    },
    Right: () => {
      dispatch(actions.pressRightKey());
    },
  },
  newGame: () => {
    dispatch(actions.newGame());
  },
  continueGame: () => {
    dispatch(actions.continueGame());
  },
  saveGame: () => {
    dispatch(actions.saveGame());
  },
}))(Game);
