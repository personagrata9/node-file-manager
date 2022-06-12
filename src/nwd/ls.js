import { readdir } from 'fs/promises';
import { checkDirentExist } from '../utils/checkDirentExist.js';
import { checkDirExist } from '../utils/checkDirExist.js';
import { checkDirentReadable } from '../utils/checkDirentReadable.js';
import { DirentNotExistError, InputError, NotDirectoryError, PermissionError } from '../utils/customErrors.js';
import { NO_ARGS_MESSAGE } from '../consts/messages.js';

export const list = async (currentDirPath, args) => {
  try {
    if (args.length) {
      throw new InputError(NO_ARGS_MESSAGE);
    } else {
      const isDirentExist = await checkDirentExist(currentDirPath);
      const isDirectory = await checkDirExist(currentDirPath);
      const isDirReadable = await checkDirentReadable(currentDirPath);

      if (!isDirentExist) {
        throw new DirentNotExistError(currentDirPath);
      } else if (!isDirectory) {
        throw new NotDirectoryError(currentDirPath);
      } else if (!isDirReadable) {
        throw new PermissionError();
      } else {
        const dirents = await readdir(currentDirPath, { withFileTypes: true });
        const result = dirents.map((dirent) => dirent.name);
        console.log(result);
      }
    }
  } catch (error) {
    throw error;
  }
};
