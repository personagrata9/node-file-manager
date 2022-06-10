import { dirname, parse } from 'path';
import { rm } from 'fs/promises';
import { getAbsolutePath } from '../utils/getAbsolutePath.js';
import { checkDirentExist } from '../utils/checkDirentExist.js';
import { checkFileExist } from '../utils/checkFileExist.js';
import { ERROR_MESSAGE, INVALID_INPUT_MESSAGE } from '../consts/messages.js';

export const deleteFile = async (currentDirPath, args) => {
  try {
    if (args.length !== 1) {
      throw new Error(INVALID_INPUT_MESSAGE);
    } else {
      const filePath = args[0];
      const absoluteFilePath = getAbsolutePath(currentDirPath, filePath);
      const dirName = dirname(absoluteFilePath);
      const fileName = parse(absoluteFilePath).base;

      const isFileExist = await checkDirentExist(absoluteFilePath);
      const isFile = await checkFileExist(absoluteFilePath);

      if (!isFileExist) {
        throw new Error(`${ERROR_MESSAGE}: ${absoluteFilePath} doesn't exist!`);
      } else if (!isFile) {
        throw new Error(`${ERROR_MESSAGE}: ${fileName} is not a file!`);
      } else {
        await rm(absoluteFilePath);
        console.log(`File ${fileName} was successfully deleted from ${dirName}!`);
      }
    }
  } catch (error) {
    console.error(error.message);
  }
};
