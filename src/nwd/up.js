import { dirname } from 'path';
import { INVALID_INPUT_MESSAGE } from '../constants/invalidInputMessage.js';

export const goUp = (currentDirPath, args) => {
  let newDirPath;

  if (args.length) {
    newDirPath = currentDirPath;
    console.error(INVALID_INPUT_MESSAGE);
  } else {
    newDirPath = dirname(currentDirPath);
  }

  return newDirPath;
};
