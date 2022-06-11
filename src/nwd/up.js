import { dirname } from 'path';
import { INVALID_INPUT_MESSAGE } from '../consts/messages.js';

export const goUp = (command, currentDirPath, args) => {
  let newDirPath;

  try {
    if (args.length) {
      newDirPath = currentDirPath;
      throw new Error(`${INVALID_INPUT_MESSAGE}: command ${command} expects no arguments!`);
    } else {
      newDirPath = dirname(currentDirPath);
    }
  } catch (error) {
    console.error(error.message);
  }

  return newDirPath;
};
