import { getAbsolutePath } from '../utils/getAbsolutePath.js';
import { checkDirentExist } from '../utils/checkDirentExist.js';
import { checkDirExist } from '../utils/checkDirExist.js';
import { checkDirentReadable } from '../utils/checkDirentReadable.js';
import { DirentNotExistError, InputError, NotDirectoryError, PermissionError } from '../utils/customErrors.js';
import { ONE_ARG_MESSAGE } from '../consts/messages.js';

export const goToDir = async (currentDirPath, args) => {
  let newDirPath = currentDirPath;

  try {
    if (args.length !== 1) {
      throw new InputError(ONE_ARG_MESSAGE);
    } else {
      const dirPath = args[0];
      const absoluteDirPath = getAbsolutePath(currentDirPath, dirPath);

      const isDirentExist = await checkDirentExist(absoluteDirPath);
      const isDirectory = await checkDirExist(absoluteDirPath);
      const isDirReadable = await checkDirentReadable(absoluteDirPath);

      if (!isDirentExist) {
        throw new DirentNotExistError(absoluteDirPath);
      } else if (!isDirectory) {
        throw new NotDirectoryError(absoluteDirPath);
      } else if (!isDirReadable) {
        throw new PermissionError();
      } else {
        newDirPath = absoluteDirPath;
      }
    }
  } catch (error) {
    throw error;
  }

  return newDirPath;
};
