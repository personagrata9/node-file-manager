import { join } from 'path';
import { writeFile } from 'fs/promises';
import { checkDirentExist } from '../utils/checkDirentExist.js';
import { validateFileName } from '../utils/validateFileName.js';
import { DirentNotExistError, FileNameIsTakenError, InputError, InvalidFileNameError } from '../utils/customErrors.js';
import { ONE_ARG_MESSAGE } from '../consts/messages.js';

export const createFile = async (currentDirPath, args) => {
  try {
    if (args.length !== 1) {
      throw new InputError(ONE_ARG_MESSAGE);
    } else {
      const newFileName = args[0];
      const newFilePath = join(currentDirPath, newFileName);

      const isCurrentDirExist = await checkDirentExist(currentDirPath);
      const isNewFileNameValid = validateFileName(newFileName);
      const isFileExist = await checkDirentExist(newFilePath);

      if (!isCurrentDirExist) {
        throw new DirentNotExistError(currentDirPath);
      } else if (!isNewFileNameValid) {
        throw new InvalidFileNameError();
      } else if (isFileExist) {
        throw new FileNameIsTakenError(newFileName);
      } else {
        await writeFile(newFilePath, '')
        console.log(`File '${newFileName}' was successfully created in directory '${currentDirPath}'!`);
      }
    }
  } catch (error) {
    throw error;
  }
};
