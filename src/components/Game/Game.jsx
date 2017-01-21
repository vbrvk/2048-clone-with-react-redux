import React from 'react';
import { connect } from 'react-redux';
import { KEY_CODES } from '../../constants';
import actions from '../../actions';
import Grid from '../Grid';


class Game extends React.Component {
  constructor() {
    super();
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }
  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyPress);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyPress);
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
    return (<Grid game={this.props.game} />);
  }
}

Game.propTypes = {
  onKeyPress: React.PropTypes.shape({
    Up: React.PropTypes.func,
    Down: React.PropTypes.func,
    Left: React.PropTypes.func,
    Right: React.PropTypes.func,
  }).isRequired,
  game: React.PropTypes.shape({
    blocks: React.PropTypes.arrayOf(React.PropTypes.array).isRequired,
    score: React.PropTypes.number.isRequired,
  }).isRequired,
};

export default connect(state => ({
  game: state.game,
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
}))(Game);
