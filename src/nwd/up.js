import { goToDir } from './cd.js';
import { InputError } from '../utils/customErrors.js';
import { NO_ARGS_MESSAGE } from '../consts/messages.js';

export const goUp = async (currentDirPath, args) => {
  let newDirPath;

  try {
    if (args.length) {
      newDirPath = currentDirPath;
      throw new InputError(NO_ARGS_MESSAGE);
    } else {
      newDirPath = goToDir(currentDirPath, ['../']);
    }
  } catch (error) {
    throw error;
  }

  return newDirPath;
};
