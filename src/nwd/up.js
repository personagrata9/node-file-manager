import { dirname } from 'path';
import { INVALID_INPUT_MESSAGE } from '../consts/messages.js';

export const goUp = (command, currentDirPath, args) => {
  let newDirPath;

  if (args.length) {
    newDirPath = currentDirPath;
    console.error(`${INVALID_INPUT_MESSAGE}: command ${command} expects no arguments!`);
  } else {
    newDirPath = dirname(currentDirPath);
  }

  return newDirPath;
};
