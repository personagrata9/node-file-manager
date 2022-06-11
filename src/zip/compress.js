import { basename, dirname, extname } from 'path';
import { createReadStream, createWriteStream} from 'fs';
import { createBrotliCompress } from 'zlib';
import { pipeline } from 'stream/promises';
import { getAbsolutePath } from '../utils/getAbsolutePath.js';
import { checkDirentExist } from '../utils/checkDirentExist.js';
import { checkFileExist } from '../utils/checkFileExist.js';
import { checkDirExist } from '../utils/checkDirExist.js';
import { checkDirentReadable } from '../utils/checkDirentReadable.js';
import { checkDirentWritable } from '../utils/checkDirentWritable.js';
import { validateFileName } from '../utils/validateFileName.js';
import { ERROR_MESSAGE, INVALID_FILE_NAME_MESSAGE, INVALID_INPUT_MESSAGE, PERMISSION_ERROR_MESSAGE } from '../consts/messages.js';

export const compress = async (command, currentDirPath, args) => {
  try {
    if (args.length !== 2) {
      throw new Error(`${INVALID_INPUT_MESSAGE}: command ${command} expects two arguments!`);
    } else {
      const srcFilePath = args[0];
      const absoluteSrcPath = getAbsolutePath(currentDirPath, srcFilePath);
      const srcFileName = basename(absoluteSrcPath);
      const srcExtName = extname(absoluteSrcPath);

      const destFilePath = args[1];
      const absoluteDestFilePath = getAbsolutePath(currentDirPath, destFilePath);
      const absoluteDestDirPath = dirname(absoluteDestFilePath);
      const destFileName = basename(absoluteDestFilePath);
      const destExtName = extname(absoluteDestFilePath);

      const extName = '.br';
      const destBaseExtName = extname(basename(absoluteDestFilePath, extName));

      const isSrcExist = await checkDirentExist(absoluteSrcPath);
      const isSrcFile = await checkFileExist(absoluteSrcPath);
      const isSrcFileReadable = await checkDirentReadable(absoluteSrcPath);

      const isDestDirExist = await checkDirentExist(absoluteDestDirPath);
      const isDestDirectory = await checkDirExist(absoluteDestDirPath);
      const isDestDirWritable = await checkDirentWritable(absoluteDestDirPath);
      const isDestFileNameValid = validateFileName(destFileName);
      const isDestFileExist = await checkDirentExist(absoluteDestFilePath);

      if (!isSrcExist) {
        throw new Error(`${ERROR_MESSAGE}: ${absoluteSrcPath} doesn't exist!`);
      } else if (!isSrcFile) {
        throw new Error(`${ERROR_MESSAGE}: ${srcFileName} is not a file!`);
      } else if (!isDestDirExist) {
        throw new Error(`${ERROR_MESSAGE}: directory ${absoluteDestDirPath} doesn't exist!`);
      } else if (!isDestDirectory) {
        throw new Error(`${ERROR_MESSAGE}: ${absoluteDestDirPath} is not a directory!`);
      } else if (!isSrcFileReadable || !isDestDirWritable) {
        throw new Error(PERMISSION_ERROR_MESSAGE);
      } else if (!isDestFileNameValid) {
        throw new Error(INVALID_FILE_NAME_MESSAGE);
      } else if (destExtName !== extName || destBaseExtName !== srcExtName) {
        throw new Error(`${ERROR_MESSAGE}: destination file extension shoud be ${srcExtName}${extName}!`);
      } else if (isDestFileExist) {
        throw new Error(`${ERROR_MESSAGE}: file ${destFileName} is already exist in directory${absoluteDestDirPath}!`);
      } else {
        const rs = createReadStream(absoluteSrcPath);
        const ws = createWriteStream(absoluteDestFilePath);
        const brotliCompress = createBrotliCompress();
        
        await pipeline(
          rs,
          brotliCompress,
          ws
        );

        console.log(`File ${srcFileName} was successfully compressed with name ${destFileName} to directory ${absoluteDestDirPath}!`);
      }
    }
  } catch (error) {
    console.error(error.message);
  }
};
