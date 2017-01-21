import { random, flatten } from 'lodash';

export const getNewBlock = position => ({
  value: null,
  position: {
    ...position,
  },
});

export const setNewRandomElement = (blocks) => { //eslint-disable-line
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

export default {
  setNewRandomElement,
};
