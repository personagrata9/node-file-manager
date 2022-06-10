import { dirname, basename, join } from 'path';
import { rename } from 'fs/promises';
import { getAbsolutePath } from '../utils/getAbsolutePath.js';
import { checkDirentExist } from '../utils/checkDirentExist.js';
import { checkFileExist } from '../utils/checkFileExist.js';
import { validateFileName } from '../utils/validateFileName.js';
import { ERROR_MESSAGE, INVALID_FILE_NAME_MESSAGE, INVALID_INPUT_MESSAGE } from '../consts/messages.js';

export const renameFile = async (command, currentDirPath, args) => {
  try {
    if (args.length !== 2) {
      throw new Error(`${INVALID_INPUT_MESSAGE}: command ${command} expects two arguments!`);
    } else {
      const filePath = args[0];
      const absoluteFilePath = getAbsolutePath(currentDirPath, filePath);
      const dirName = dirname(absoluteFilePath);
      const fileName = basename(absoluteFilePath);

      const newFileName = args[1];
      const absoluteNewFilePath = join(dirName, newFileName);

      const isFileExist = await checkDirentExist(absoluteFilePath);
      const isFile = await checkFileExist(absoluteFilePath);
      const isNewFileNameValid = validateFileName(newFileName);
      const isFileRenamed = await checkDirentExist(absoluteNewFilePath);

      if (!isFileExist) {
        throw new Error(`${ERROR_MESSAGE}: ${absoluteFilePath} doesn't exist!`);
      } else if (!isFile) {
        throw new Error(`${ERROR_MESSAGE}: ${fileName} is not a file!`);
      } else if (!isNewFileNameValid) {
        throw new Error(INVALID_FILE_NAME_MESSAGE);
      } else if (isFileRenamed) {
        throw new Error(`${ERROR_MESSAGE}: name ${newFileName} is already taken, please choose a different name!`);
      } else {
        await rename(absoluteFilePath, absoluteNewFilePath);
        console.log(`File ${fileName} in directory ${dirName} was successfully renamed to ${newFileName}!`);
      }
    }
  } catch (error) {
    console.error(error.message);
  }
};
