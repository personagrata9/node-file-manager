import { parse } from 'path';
import { createReadStream } from 'fs';
import { getAbsolutePath } from '../utils/getAbsolutePath.js';
import { checkDirentExist } from '../utils/checkDirentExist.js';
import { checkFileExist } from '../utils/checkFileExist.js';
import { INVALID_INPUT_MESSAGE } from '../constants/invalidInputMessage.js';
import { ERROR_MESSAGE } from '../constants/errorMessage.js';

const getFileContent = (filePath) => {
  const rs = createReadStream(filePath, { encoding: 'utf-8' });
  
  return new Promise((resolve, reject) => {
      let content = '';
      
      rs.on('data', (chunk) => content += chunk);
      rs.on('end', () => resolve(content));
      rs.on('error', () => reject(new Error(ERROR_MESSAGE)));
  });
};

export const readFile = async (currentDirPath, args) => {
  try {
    if (!args.length || args.length > 1) {
      throw new Error(INVALID_INPUT_MESSAGE);
    } else {
      const filePath = args[0];
      const absoluteFilePath = getAbsolutePath(currentDirPath, filePath);
      const fileName = parse(absoluteFilePath).base;

      const isFileExist = await checkDirentExist(absoluteFilePath);
      const isFile = await checkFileExist(absoluteFilePath);

      if (!isFileExist) {
        throw new Error(`${ERROR_MESSAGE}: ${absoluteFilePath} doesn't exist!`);
      } else if (!isFile) {
        throw new Error(`${ERROR_MESSAGE}: ${fileName} is not a file!`);
      } else {
        const content = await getFileContent(absoluteFilePath);
        console.log(content);
      }
    }
  } catch (error) {
    console.error(error.message);
  }
};