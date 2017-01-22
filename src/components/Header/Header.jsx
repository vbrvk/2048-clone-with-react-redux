import React from 'react';

import './Header.css';


const Header = ({ width, onClickButton, score, bestScore }) =>
(
  <div style={{ width }} className="Header pt-card">
    <h5 className="pt-ui-text-large">
      Join the numbers and get to the 2048 tile!
    </h5>
    <p className="score">
      Score: {score}&nbsp;
      Best: {bestScore}&nbsp;
      <button
        onClick={onClickButton}
        type="button"
        className="new-game-button pt-button pt-intent-primary pt-icon-refresh"
      >
        New game
      </button>
    </p>

  </div>
);

Header.propTypes = {
  width: React.PropTypes.string.isRequired,
  score: React.PropTypes.number.isRequired,
  bestScore: React.PropTypes.number.isRequired,
  onClickButton: React.PropTypes.func.isRequired,
};
export default Header;
