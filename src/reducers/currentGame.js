import { eq, random, flatten } from 'lodash';
import { GAME_STATUS, VECTORS } from '../constants';

/* eslint-disable no-param-reassign*/

const getFieldSizeFromBlocks = blocks => ({
  width: blocks[0].length,
  height: blocks.length,
});


const getNewBlock = position => ({
  value: null,
  position: {
    ...position,
  },
});

const setNewRandomElement = (blocks) => { //eslint-disable-line
  const nullBlocks = flatten(blocks).filter(block => !block.value);
  if (nullBlocks.length) {
    const newBlock = nullBlocks[random(nullBlocks.length - 1)];
    newBlock.value = Math.random() > 0.9 ? 4 : 2;
    const { x, y } = newBlock.position;
    return [
      ...blocks.slice(0, y),
      [...blocks[y].slice(0, x), newBlock, ...blocks[y].slice(x + 1)],
      ...blocks.slice(y + 1),
    ];
  }
};

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

const isExitAvailableBlock = (blocks) => {
  for (let rows of blocks) { // eslint-disable-line
    for (let block of rows) { // eslint-disable-line
      if (block.value === null) return true;
    }
  }
  return false;
};

const isExitBlocksForMerdge = (blocks) => {
  const vectorKeys = Object.keys(VECTORS);
  let sideBlock;
  for (let rows of blocks) { // eslint-disable-line
    for (let block of rows) { // eslint-disable-line
      for (let vectorKey of vectorKeys) { // eslint-disable-line
        sideBlock = getBlock(blocks, {
          x: block.position.x + VECTORS[vectorKey].x,
          y: block.position.y + VECTORS[vectorKey].y,
        });
        if (sideBlock && sideBlock.value === block.value) return true;
      }
    }
  }

  return false;
};

const isGameEnd = (blocks) => {
  if (isExitAvailableBlock(blocks) || isExitBlocksForMerdge(blocks)) return false;
  return true;
};

export const getNewBlocksAfterKeyPress = (state, vector) => {
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
          state.score += currentBlock.value;
          if (state.score > state.bestScore) state.bestScore = state.score;
          moved = true;

          if (currentBlock.value === 2048) state.status = GAME_STATUS.WIN;
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
    if (isGameEnd(blocks)) state.status = GAME_STATUS.LOSE;
  }

  return {
    ...state,
    blocks: [...blocks],
  };
};

export const getNewGameState = (width = 4, height = 4) => {
  const state = {
    width,
    height,
    blockSize: 100,
    blocks: [],
    borderWidth: 10,
    score: 0,
    bestScore: 0,
    status: GAME_STATUS.PLAY,
  };

  for (let y = 0; y < state.height; ++y) { // eslint-disable-line
    state.blocks.push([]);
    for (let x = 0; x < state.width; ++x) { //eslint-disable-line
      state.blocks[y].push(getNewBlock({ x, y }));
    }
  }
  // state.blocks[0][0].value = 1024;
  // state.blocks[0][1].value = 1024;
  setNewRandomElement(setNewRandomElement(state.blocks));
  return state;
};

export default { getNewBlocksAfterKeyPress, getNewGameState };
