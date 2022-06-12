import { basename, dirname } from 'path';
import { createReadStream, createWriteStream} from 'fs';
import { createBrotliCompress } from 'zlib';
import { pipeline } from 'stream/promises';
import { getFileExtensions } from '../utils/getFileExtensions.js';
import { getAbsolutePath } from '../utils/getAbsolutePath.js';
import { checkDirentExist } from '../utils/checkDirentExist.js';
import { checkFileExist } from '../utils/checkFileExist.js';
import { checkDirExist } from '../utils/checkDirExist.js';
import { checkDirentReadable } from '../utils/checkDirentReadable.js';
import { checkDirentWritable } from '../utils/checkDirentWritable.js';
import { validateFileName } from '../utils/validateFileName.js';
import {
  DirentNotExistError,
  FileAlreadyExistError,
  InputError,
  InvalidFileNameError,
  NotDirectoryError,
  NotFileError,
  OperationError,
  PermissionError
} from '../utils/customErrors.js';
import { TWO_ARGS_MESSAGE } from '../consts/messages.js';

export const compress = async (currentDirPath, args) => {
  try {
    if (args.length !== 2) {
      throw new InputError(TWO_ARGS_MESSAGE);
    } else {
      const extName = '.br';
      
      const srcFilePath = args[0];
      const absoluteSrcPath = getAbsolutePath(currentDirPath, srcFilePath);
      const srcFileName = basename(absoluteSrcPath);
      const srcFileExtansions = getFileExtensions(srcFileName);
      
      const destFilePath = args[1];
      const initDestFileName = basename(destFilePath);
      const destFileExtansions = getFileExtensions(initDestFileName);
      const absoluteDestFilePath = destFileExtansions.toLowerCase() === srcFileExtansions.toLowerCase()
        ? getAbsolutePath(currentDirPath, `${destFilePath}${extName}`)
        : getAbsolutePath(currentDirPath, destFilePath);
      const absoluteDestDirName = dirname(absoluteDestFilePath);
      const destFileName = basename(absoluteDestFilePath);

      const isSrcExist = await checkDirentExist(absoluteSrcPath);
      const isSrcFile = await checkFileExist(absoluteSrcPath);
      const isSrcFileReadable = await checkDirentReadable(absoluteSrcPath);

      const isDestDirExist = await checkDirentExist(absoluteDestDirName);
      const isDestDirectory = await checkDirExist(absoluteDestDirName);
      const isDestDirWritable = await checkDirentWritable(absoluteDestDirName);
      const isDestFileNameValid = validateFileName(destFileName);
      const isDestFileExist = await checkDirentExist(absoluteDestFilePath);

      if (!isSrcExist) {
        throw new DirentNotExistError(absoluteSrcPath);
      } else if (!isSrcFile) {
        throw new NotFileError(srcFileName);
      } else if (!isDestDirExist) {
        throw new DirentNotExistError(absoluteDestDirName);
      } else if (!isDestDirectory) {
        throw new NotDirectoryError(absoluteDestDirName);
      } else if (!isSrcFileReadable || !isDestDirWritable) {
        throw new PermissionError();
      } else if (!isDestFileNameValid) {
        throw new InvalidFileNameError();
      } else if ((srcFileExtansions.toLowerCase() !== destFileExtansions.toLowerCase()) && (`${srcFileExtansions.toLowerCase()}${extName}` !== destFileExtansions.toLowerCase()) ) {
        const errorMessage = srcFileExtansions
          ? `destination file '${initDestFileName}' should have an extensions '${srcFileExtansions}' or '${srcFileExtansions}${extName}' (in upper or lower case)`
          : `destination file '${initDestFileName}' should have an extension '${extName} (in upper or lower case) or no extension`;
        throw new OperationError(errorMessage);
      } else if (isDestFileExist) {
        throw new FileAlreadyExistError(destFileName, absoluteDestDirName);
      } else {
        const rs = createReadStream(absoluteSrcPath);
        const ws = createWriteStream(absoluteDestFilePath);

        const brotliCompress = createBrotliCompress();
        
        await pipeline(rs, brotliCompress, ws);

        console.log(`File '${srcFileName}' was successfully compressed with name '${destFileName}' to directory '${absoluteDestDirName}'!`);
      }
    }
  } catch (error) {
    throw error;
  }
};
