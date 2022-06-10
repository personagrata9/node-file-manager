import { parse } from 'path';
import { createReadStream } from 'fs';
import { getAbsolutePath } from '../utils/getAbsolutePath.js';
import { checkDirentExist } from '../utils/checkDirentExist.js';
import { checkFileExist } from '../utils/checkFileExist.js';
import { ERROR_MESSAGE, INVALID_INPUT_MESSAGE } from '../consts/messages.js';

const { createHash } = await import('crypto');

const calculateHash = (filePath) => {
  const rs = createReadStream(filePath, { encoding: 'utf-8' });
  
  return new Promise((resolve, reject) => {
      let content = '';
      
      rs.on('data', (chunk) => content += chunk);
      rs.on('end', () => {
        const hash = createHash('sha256');
        const result = hash.update(content).digest('hex');

        resolve(result);
      });
      rs.on('error', () => reject(new Error(ERROR_MESSAGE)));
  });
};

export const printHash = async (currentDirPath, args) => {
  try {
    if (args.length !== 1) {
      throw new Error(INVALID_INPUT_MESSAGE);
    } else {
      const filePath = args[0];
      const absoluteFilePath = getAbsolutePath(currentDirPath, filePath);
      const fileName = parse(absoluteFilePath).base;

      const isFileExist = await checkDirentExist(absoluteFilePath);
      const isFile = await checkFileExist(absoluteFilePath);

      if (!isFileExist) {
        throw new Error(`${ERROR_MESSAGE}: ${isFileExist} doesn't exist!`);
      } else if (!isFile) {
        throw new Error(`${ERROR_MESSAGE}: ${fileName} is not a file!`);
      } else {
        const hash = await calculateHash(absoluteFilePath);
        if (hash) console.log(hash);
      }
    }
  } catch (error) {
    console.error(error.message);
  }
};
