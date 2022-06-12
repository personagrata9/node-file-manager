import { dirname, basename, join } from 'path';
import { rename } from 'fs/promises';
import { getAbsolutePath } from '../utils/getAbsolutePath.js';
import { checkDirentExist } from '../utils/checkDirentExist.js';
import { checkFileExist } from '../utils/checkFileExist.js';
import { checkDirentReadable } from '../utils/checkDirentReadable.js';
import { validateFileName } from '../utils/validateFileName.js';
import {
  DirentNotExistError,
  FileNameIsTakenError,
  InputError,
  InvalidFileNameError,
  NotFileError,
  PermissionError
} from '../utils/customErrors.js';
import { TWO_ARGS_MESSAGE } from '../consts/messages.js';

export const renameFile = async (currentDirPath, args) => {
  try {
    if (args.length !== 2) {
      throw new InputError(TWO_ARGS_MESSAGE);
    } else {
      const filePath = args[0];
      const absoluteFilePath = getAbsolutePath(currentDirPath, filePath);
      const dirName = dirname(absoluteFilePath);
      const fileName = basename(absoluteFilePath);

      const newFileName = args[1];
      const absoluteNewFilePath = join(dirName, newFileName);

      const isFileExist = await checkDirentExist(absoluteFilePath);
      const isFile = await checkFileExist(absoluteFilePath);
      const isFileReadable = await checkDirentReadable(absoluteFilePath);

      const isNewFileNameValid = validateFileName(newFileName);
      const isNewFileExist = await checkDirentExist(absoluteNewFilePath);

      if (!isFileExist) {
        throw new DirentNotExistError(absoluteFilePath);
      } else if (!isFile) {
        throw new NotFileError(fileName);
      } else if (!isFileReadable) {
        throw new PermissionError();
      } else if (!isNewFileNameValid) {
        throw new InvalidFileNameError();
      } else if (isNewFileExist) {
        throw new FileNameIsTakenError(newFileName);
      } else {
        await rename(absoluteFilePath, absoluteNewFilePath);
        console.log(`File '${fileName}' in directory '${dirName}' was successfully renamed to '${newFileName}'!`);
      }
    }
  } catch (error) {
    throw error;
  }
};
