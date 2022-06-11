import { getAbsolutePath } from '../utils/getAbsolutePath.js';
import { checkDirentExist } from '../utils/checkDirentExist.js';
import { checkDirExist } from '../utils/checkDirExist.js';
import { checkDirentReadable } from '../utils/checkDirentReadable.js';
import { ERROR_MESSAGE, INVALID_INPUT_MESSAGE, PERMISSION_ERROR_MESSAGE } from '../consts/messages.js';

export const goToDir = async (command, currentDirPath, args) => {
  let newDirPath = currentDirPath;

  try {
    if (args.length !== 1) {
      throw new Error(`${INVALID_INPUT_MESSAGE}: command ${command} expects one argument!`);
    } else {
      const dirPath = args[0];
      const absoluteDirPath = getAbsolutePath(currentDirPath, dirPath);
      const isDirentExist = await checkDirentExist(absoluteDirPath);
      const isDirectory = await checkDirExist(absoluteDirPath);
      const isDirReadable = await checkDirentReadable(absoluteDirPath);

      if (!isDirentExist) {
        throw new Error(`${ERROR_MESSAGE}: ${absoluteDirPath} doesn't exist!`);
      } else if (!isDirectory) {
        throw new Error(`${ERROR_MESSAGE}: ${absoluteDirPath} not a directory!`);
      } else if (!isDirReadable) {
        throw new Error(PERMISSION_ERROR_MESSAGE);
      } else {
        newDirPath = absoluteDirPath;
      }
    }
  } catch (error) {
    console.error(error.message);
  }

  return newDirPath;
};
