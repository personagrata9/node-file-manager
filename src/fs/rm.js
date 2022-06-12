import { dirname, basename } from 'path';
import { rm } from 'fs/promises';
import { getAbsolutePath } from '../utils/getAbsolutePath.js';
import { checkDirentExist } from '../utils/checkDirentExist.js';
import { checkFileExist } from '../utils/checkFileExist.js';
import { checkDirentReadable } from '../utils/checkDirentReadable.js';
import { DirentNotExistError, InputError, NotFileError, PermissionError } from '../utils/customErrors.js';
import { ONE_ARG_MESSAGE } from '../consts/messages.js';

export const deleteFile = async (currentDirPath, args) => {
  try {
    if (args.length !== 1) {
      throw new InputError(ONE_ARG_MESSAGE);
    } else {
      const filePath = args[0];
      const absoluteFilePath = getAbsolutePath(currentDirPath, filePath);
      const dirName = dirname(absoluteFilePath);
      const fileName = basename(absoluteFilePath);

      const isFileExist = await checkDirentExist(absoluteFilePath);
      const isFile = await checkFileExist(absoluteFilePath);
      const isFileReadable = await checkDirentReadable(absoluteFilePath);

      if (!isFileExist) {
        throw new DirentNotExistError(absoluteFilePath);
      } else if (!isFile) {
        throw new NotFileError(fileName);
      } else if (!isFileReadable) {
        throw new PermissionError();
      } else {
        await rm(absoluteFilePath);
        console.log(`File '${fileName}' was successfully deleted from '${dirName}'!`);
      }
    }
  } catch (error) {
    throw error;
  }
};
