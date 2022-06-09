import { readdir } from 'fs/promises';
import { checkDirExist } from '../utils/checkDirExist.js';
import { INVALID_INPUT_MESSAGE } from '../constants/invalidInputMessage.js';
import { ERROR_MESSAGE } from '../constants/errorMessage.js';

export const list = async (currentDirPath, args) => {
  try {
    if (args.length) {
      throw new Error(INVALID_INPUT_MESSAGE);
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
