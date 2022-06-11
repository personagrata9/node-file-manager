import { dirname, basename } from 'path';
import { rm } from 'fs/promises';
import { getAbsolutePath } from '../utils/getAbsolutePath.js';
import { checkDirentExist } from '../utils/checkDirentExist.js';
import { checkFileExist } from '../utils/checkFileExist.js';
import { checkDirentReadable } from '../utils/checkDirentReadable.js';
import { ERROR_MESSAGE, INVALID_INPUT_MESSAGE, PERMISSION_ERROR_MESSAGE } from '../consts/messages.js';

export const deleteFile = async (command, currentDirPath, args) => {
  try {
    if (args.length !== 1) {
      throw new Error(`${INVALID_INPUT_MESSAGE}: command ${command} expects one argument!`);
    } else {
      const filePath = args[0];
      const absoluteFilePath = getAbsolutePath(currentDirPath, filePath);
      const dirName = dirname(absoluteFilePath);
      const fileName = basename(absoluteFilePath);

      const isFileExist = await checkDirentExist(absoluteFilePath);
      const isFile = await checkFileExist(absoluteFilePath);
      const isFileReadable = await checkDirentReadable(absoluteFilePath);

      if (!isFileExist) {
        throw new Error(`${ERROR_MESSAGE}: ${absoluteFilePath} doesn't exist!`);
      } else if (!isFile) {
        throw new Error(`${ERROR_MESSAGE}: ${fileName} is not a file!`);
      } else if (!isFileReadable) {
        throw new Error(PERMISSION_ERROR_MESSAGE);
      } else {
        await rm(absoluteFilePath);
        console.log(`File ${fileName} was successfully deleted from ${dirName}!`);
      }
    }
  } catch (error) {
    console.error(error.message);
  }
};
