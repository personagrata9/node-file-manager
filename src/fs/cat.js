import { basename } from 'path';
import { createReadStream } from 'fs';
import { getAbsolutePath } from '../utils/getAbsolutePath.js';
import { checkDirentExist } from '../utils/checkDirentExist.js';
import { checkFileExist } from '../utils/checkFileExist.js';
import { checkDirentReadable } from '../utils/checkDirentReadable.js';
import { DirentNotExistError, InputError, NotFileError, PermissionError } from '../utils/customErrors.js';
import { ONE_ARG_MESSAGE } from '../consts/messages.js';

const getFileContent = (filePath) => {
  const rs = createReadStream(filePath, { encoding: 'utf-8' });
  
  return new Promise((resolve, reject) => {
      let content = '';
      
      rs.on('data', (chunk) => content += chunk);
      rs.on('end', () => resolve(content));
      rs.on('error', reject);
  });
};

export const readFile = async (currentDirPath, args) => {
  try {
    if (args.length !== 1) {
      throw new InputError(ONE_ARG_MESSAGE);
    } else {
      const filePath = args[0];
      const absoluteFilePath = getAbsolutePath(currentDirPath, filePath);
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
        const content = await getFileContent(absoluteFilePath);
        if (content) console.log(content);
      }
    }
  } catch (error) {
    throw error;
  }
};
