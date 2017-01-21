import { eq } from 'lodash';
import { actionTypes, GAME_STATUS } from '../constants';
import { setNewRandomElement, getNewBlock } from './helpers';

/* eslint-disable no-param-reassign*/

const getFieldSizeFromBlocks = blocks => ({
  width: blocks[0].length,
  height: blocks.length,
});

const isInField = (position, fieldSize) => position.x >= 0 &&
                                           position.y >= 0 &&
                                           position.x < fieldSize.width &&
                                           position.y < fieldSize.height;

const getBlock = (blocks, position) => {
  if (isInField(position, getFieldSizeFromBlocks(blocks))) {
    return blocks[position.y][position.x];
  }
  return null;
};

const setBlock = (blocks, position, block) => {
  if (isInField(position, getFieldSizeFromBlocks(blocks))) {
    blocks[position.y][position.x] = block;
    return blocks[position.y][position.x];
  }

  return false;
};

const isBlockAvailable = (blocks, position) => {
  const block = getBlock(blocks, position);
  return block ? !block.value : false;
};

const getFarthestPosition = (blocks, position, vector) => { // eslint-disable-line
  let previos;
  const fieldSize = getFieldSizeFromBlocks(blocks);
  do {
    previos = position;
    position = { x: previos.x + vector.x, y: previos.y + vector.y };
  } while (
      isBlockAvailable(blocks, position) &&
      isInField(position, fieldSize)
    );

  return {
    farthest: previos,
    next: isInField(position, fieldSize) ? blocks[position.y][position.x] : null,
  };
};

const buildTraversals = (fieldSize, vector) => {
  const traversals = { x: [], y: [] };

  for (let x = 0; x < fieldSize.width; ++x) traversals.x.push(x); // eslint-disable-line
  for (let y = 0; y < fieldSize.height; ++y) traversals.y.push(y); // eslint-disable-line

  if (vector.x === 1) traversals.x = traversals.x.reverse();
  if (vector.y === 1) traversals.y = traversals.y.reverse();

  return traversals;
};

const normalize = blocks => blocks.map(rows => rows.map(block => ({ ...block, merged: false })));

const getNewBlocksAfterKeyPress = (state, vector) => {
  let { blocks } = state;
  const fieldSize = getFieldSizeFromBlocks(blocks);
  const traversals = buildTraversals(fieldSize, vector);
  let currentBlock;
  let positions;
  let next;
  let moved = false;

  blocks = normalize(blocks);

  traversals.x.forEach((x) => {
    traversals.y.forEach((y) => {
      currentBlock = blocks[y][x];
      if (currentBlock.value) {
        positions = getFarthestPosition(blocks, currentBlock.position, vector);
        next = positions.next;
        if (next && next.value === currentBlock.value && !next.merged) {
          const prevPos = currentBlock.position;
          currentBlock.position = next.position;

          setBlock(blocks, currentBlock.position, currentBlock);
          setBlock(blocks, prevPos, getNewBlock(prevPos));

          currentBlock.merged = true;
          currentBlock.value *= 2;
          console.log(JSON.parse(JSON.stringify(currentBlock)));
          state.score += currentBlock.value;
          moved = true;

          if (currentBlock.value === 2048) state.status = GAME_STATUS.WON;
        } else if (!eq(positions.farthest, currentBlock.position)) {
          const prevPos = currentBlock.position;
          currentBlock.position = positions.farthest;
          setBlock(blocks, positions.farthest, currentBlock);
          setBlock(blocks, prevPos, getNewBlock(prevPos));

          moved = true;
        }
      }
    });
  });

  if (moved) {
    setNewRandomElement(blocks);
  }

  return {
    ...state,
    blocks: [...blocks],
  };
};

export default (state, action) => {
  switch (action.type) {
    case (actionTypes.PRESS_DOWN_KEY):
    case (actionTypes.PRESS_UP_KEY):
    case (actionTypes.PRESS_RIGHT_KEY):
    case (actionTypes.PRESS_LEFT_KEY):
      return {
        ...state,
        ...(getNewBlocksAfterKeyPress(state, action.vector)),
      };
    default: return state;
  }
};
