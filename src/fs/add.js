import { join } from 'path';
import { createWriteStream } from 'fs';
import { checkDirentExist } from '../utils/checkDirentExist.js';
import { validateFileName } from '../utils/validateFileName.js';
import { ERROR_MESSAGE, INVALID_FILE_NAME_MESSAGE, INVALID_INPUT_MESSAGE } from '../consts/messages.js';

export const createFile = async (command, currentDirPath, args) => {
  try {
    if (args.length !== 1) {
      throw new Error(`${INVALID_INPUT_MESSAGE}: command ${command} expects one argument!`);
    } else {
      const newFileName = args[0];
      const newFilePath = join(currentDirPath, newFileName);

      const isFileExist = await checkDirentExist(newFilePath);
      const isNewFileNameValid = validateFileName(newFileName);

      if (isFileExist) {
        throw new Error(`${ERROR_MESSAGE}: name ${newFileName} is already taken, please choose a different name!`);
      } else if (!isNewFileNameValid) {
        throw new Error(INVALID_FILE_NAME_MESSAGE);
      } else {
        const ws = createWriteStream(newFilePath);
        console.log(`File ${newFileName} was successfully created in directory ${currentDirPath}!`);
        ws.close();
      }
    }
  } catch (error) {
    console.error(error.message)
  }
};
