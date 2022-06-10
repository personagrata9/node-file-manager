import { parse, dirname, join }  from 'path';
import { createReadStream, createWriteStream } from 'fs';
import { pipeline } from 'stream/promises';
import { rm } from 'fs/promises';
import { getAbsolutePath } from '../utils/getAbsolutePath.js';
import { checkDirentExist } from '../utils/checkDirentExist.js';
import { checkFileExist } from '../utils/checkFileExist.js';
import { checkDirExist } from '../utils/checkDirExist.js';
import { ERROR_MESSAGE, INVALID_INPUT_MESSAGE } from '../consts/messages.js';

export const copyFile = async (currentDirPath, args, options) => {
  const { move } = options;
  
  try {
    if (args.length !== 2) {
      throw new Error(INVALID_INPUT_MESSAGE);
    } else {
      const filePath = args[0];
      const absoluteSrcPath = getAbsolutePath(currentDirPath, filePath);
      const srcFileName = parse(absoluteSrcPath).base;
      const srcDirName = dirname(absoluteSrcPath);

      const newDirPath = args[1];
      const absoluteNewDirPath = getAbsolutePath(currentDirPath, newDirPath);
      const absoluteDestPath = join(absoluteNewDirPath, srcFileName);

      const isSrcExist = await checkDirentExist(absoluteSrcPath);
      const isSrcFile = await checkFileExist(absoluteSrcPath);
      const isNewDirExist = await checkDirentExist(absoluteNewDirPath);
      const isDestDirectory = await checkDirExist(absoluteNewDirPath);
      const isDestExist = await checkDirentExist(absoluteDestPath);

      if (!isSrcExist) {
        throw new Error(`${ERROR_MESSAGE}: ${absoluteSrcPath} doesn't exist!`);
      } else if (!isSrcFile) {
        throw new Error(`${ERROR_MESSAGE}: ${srcFileName} is not a file!`);
      } else if (!isNewDirExist) {
        throw new Error(`${ERROR_MESSAGE}: ${absoluteNewDirPath} doesn't exist!`);
      } else if (!isDestDirectory) {
        throw new Error(`${ERROR_MESSAGE}: ${absoluteNewDirPath} is not a directory!`);
      } else if (isDestExist) {
        throw new Error(`${ERROR_MESSAGE}: file ${srcFileName} is already exist in directory${absoluteNewDirPath}!`);
      } else {
        const rs = createReadStream(absoluteSrcPath);
        const ws = createWriteStream(absoluteDestPath);
        
        await pipeline(
          rs,
          ws);

        if (!move) {
          console.log(`File ${srcFileName} was successfully copied from directory ${srcDirName} to directory ${absoluteNewDirPath}!`);
        } else {
          await rm(absoluteSrcPath);
          console.log(`File ${srcFileName} was successfully moved from directory ${srcDirName} to directory ${absoluteNewDirPath}!`);
        }
      }
    }
  } catch (error) {
    console.error(error.message);
  }
};
