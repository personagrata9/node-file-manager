import { dirname, parse, join } from 'path';
import { rename } from 'fs/promises';
import { getAbsolutePath } from '../utils/getAbsolutePath.js';
import { checkDirentExist } from '../utils/checkDirentExist.js';
import { checkFileExist } from '../utils/checkFileExist.js';
import { INVALID_INPUT_MESSAGE } from '../constants/invalidInputMessage.js';
import { ERROR_MESSAGE } from '../constants/errorMessage.js';

export const renameFile = async (currentDirPath, args) => {
  try {
    if (args.length !== 2) {
      throw new Error(INVALID_INPUT_MESSAGE);
    } else {
      const filePath = args[0];
      const absoluteFilePath = getAbsolutePath(currentDirPath, filePath);
      const dirName = dirname(absoluteFilePath);
      const fileName = parse(absoluteFilePath).base;

      const newFileName = args[1];
      const absoluteNewFilePath = join(dirName, newFileName);

      const isFileExist = await checkDirentExist(absoluteFilePath);
      const isFile = await checkFileExist(absoluteFilePath);
      const isFileRenamed = await checkDirentExist(absoluteNewFilePath);

      if (!isFileExist) {
        throw new Error(`${ERROR_MESSAGE}: ${absoluteFilePath} doesn't exist!`);
      } else if (!isFile) {
        throw new Error(`${ERROR_MESSAGE}: ${fileName} is not a file!`);
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
