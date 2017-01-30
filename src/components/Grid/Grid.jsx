import React from 'react';
import './Grid.css';
import Block from '../Block/';

const defaultColorScheme = {
  backgroundColor: '#ccc',
  2: '#f44336',
  4: '#E91E63',
  8: '#9C27B0',
  16: '#673AB7',
  32: '#3F51B5',
  64: '#2196F3',
  128: '#03A9F4',
  256: '#00BCD4',
  512: '#FFEB3B',
  1024: '#FFC107',
  2048: '#FF9800',
  4096: '#FF5722',
  8192: '#8BC34A',
  16384: '#4CAF50',
};

const Grid = ({ game, colorScheme, width, height }) => {
  const emptyBlocks = [];
  for (let y = 0; y < game.size.height; ++y) { // eslint-disable-line
    for (let x = 0; x < game.size.width; ++x) { // eslint-disable-line
      emptyBlocks.push(
        <div
          className="Game-empty-block"
          key={`empty-${x}-${y}`}
          style={{
            top: (y * (game.blockSize + game.borderWidth)) + game.borderWidth,
            left: (x * (game.blockSize + game.borderWidth)) + game.borderWidth,
            width: game.blockSize,
            height: game.blockSize,
            backgroundColor: '#737373',
            position: 'absolute',
            borderRadius: '3px',
          }}
        />,
      );
    }
  }


  return (
    <div
      style={{
        padding: `${game.borderWidth}px`,
        backgroundColor: colorScheme.backgroundColor,
        width,
        height,
      }}
      className="Grid"
    >
      {emptyBlocks}
      {
        game.blocks.active.map(block => (
          (
            <Block
              key={block.id}
              size={{
                block: game.blockSize,
                margin: game.borderWidth,
              }}
              isNew={block.new}
              color={colorScheme[block.value]}
              value={block.value}
              position={block.position}
              merged={block.merged}
            />
          )
        ))
      }
    </div>);
};

Grid.propTypes = {
  game: React.PropTypes.shape({
    blocks: React.PropTypes.shape({
      active: React.PropTypes.array,
    }).isRequired,
    score: React.PropTypes.number.isRequired,
    size: React.PropTypes.shape({
      width: React.PropTypes.number,
      height: React.PropTypes.number,
    }).isRequired,
  }).isRequired,
  width: React.PropTypes.string.isRequired,
  height: React.PropTypes.string.isRequired,
  colorScheme: React.PropTypes.shape({
    backgroundColor: React.PropTypes.string,
    2: React.PropTypes.string,
    4: React.PropTypes.string,
    8: React.PropTypes.string,
    16: React.PropTypes.string,
    32: React.PropTypes.string,
    64: React.PropTypes.string,
    128: React.PropTypes.string,
    256: React.PropTypes.string,
    512: React.PropTypes.string,
    1024: React.PropTypes.string,
    2048: React.PropTypes.string,
    4096: React.PropTypes.string,
    8192: React.PropTypes.string,
    16384: React.PropTypes.string,
  }),
};

Grid.defaultProps = {
  colorScheme: defaultColorScheme,
};
export default Grid;
