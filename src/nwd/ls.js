import { readdir } from 'fs/promises';
import { checkDirExist } from '../utils/checkDirExist.js';
import { ERROR_MESSAGE, INVALID_INPUT_MESSAGE } from '../consts/messages.js';

export const list = async (command, currentDirPath, args) => {
  try {
    if (args.length) {
      throw new Error(`${INVALID_INPUT_MESSAGE}: command ${command} expects no arguments!`);
    } else {
      const isDirExist = await checkDirExist(currentDirPath);

      if (!isDirExist) {
        throw new Error(`${ERROR_MESSAGE}: directory doesn't exist!`);
      } else {
        const dirents = await readdir(currentDirPath, { withFileTypes: true });
        const result = dirents.map((dirent) => dirent.name);
        console.log(result);
      }
    }
  } catch (error) {
    console.error(error.message);
  }
};
