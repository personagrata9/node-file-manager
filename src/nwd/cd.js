import { getAbsolutePath } from '../utils/getAbsolutePath.js';
import { checkDirentExist } from '../utils/checkDirentExist.js';
import { checkDirExist } from '../utils/checkDirExist.js';
import { INVALID_INPUT_MESSAGE } from '../constants/invalidInputMessage.js';
import { ERROR_MESSAGE } from '../constants/errorMessage.js';

export const goToDir = async (currentDirPath, args) => {
  let newDirPath;

  try {
    if (args.length !== 1) {
      newDirPath = currentDirPath;
      throw new Error(INVALID_INPUT_MESSAGE);
    } else {
      const dirPath = args[0];
      const absoluteDirPath = getAbsolutePath(currentDirPath, dirPath);
      const isDirentExist = await checkDirentExist(absoluteDirPath);
      const isDirectory = await checkDirExist(absoluteDirPath);

      if (!isDirentExist) {
        newDirPath = currentDirPath;
        throw new Error(`${ERROR_MESSAGE}: ${absoluteDirPath} doesn't exist!`);
      } else if (!isDirectory) {
        newDirPath = currentDirPath;
        throw new Error(`${ERROR_MESSAGE}: ${absoluteDirPath} not a directory!`);
      } else {
        newDirPath = absoluteDirPath;
      }
    }
  } catch (error) {
    console.error(error.message);
  }

  return newDirPath;
};
