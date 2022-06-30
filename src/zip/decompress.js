import { basename, dirname, extname } from 'path';
import { createReadStream, createWriteStream } from 'fs';
import { createBrotliDecompress } from 'zlib';
import { pipeline } from 'stream/promises';
import { rm } from 'fs/promises';
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

export const decompress = async (currentDirPath, args) => {
  try {
    if (args.length !== 2) {
      throw new InputError(TWO_ARGS_MESSAGE);
    } else {
      const extName = '.br';
      
      const srcFilePath = args[0];
      const absoluteSrcPath = getAbsolutePath(currentDirPath, srcFilePath);
      const initSrcFileName = basename(absoluteSrcPath);
      const cuttedSrcFileName = basename(initSrcFileName, extName);
      const cuttedSrcFileExtansions = getFileExtensions(cuttedSrcFileName);

      const destFilePath = args[1];
      const initDestFileName = basename(destFilePath);
      const destFileExtansions = getFileExtensions(initDestFileName);
      const absoluteDestFilePath = getAbsolutePath(currentDirPath, destFilePath);
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
        throw new NotFileError(initSrcFileName);
      } else if (!isDestDirExist) {
        throw new DirentNotExistError(absoluteDestDirName);
      } else if (!isDestDirectory) {
        throw new NotDirectoryError(absoluteDestDirName);
      } else if (!isSrcFileReadable || !isDestDirWritable) {
        throw new PermissionError();
      } else if (!isDestFileNameValid) {
        throw new InvalidFileNameError();
      } else if (destFileExtansions.toLowerCase() !== cuttedSrcFileExtansions.toLowerCase()) {
        const errorMessage = cuttedSrcFileExtansions
          ? `destination file '${destFileName}' extensions shoud be '${cuttedSrcFileExtansions}' (in upper or lower case)`
          : `destination file '${destFileName}' file should have no extension`;

        throw new OperationError(errorMessage);
      } else if (isDestFileExist) {
        throw new FileAlreadyExistError(destFileName, absoluteDestDirName);
      } else {
        const rs = createReadStream(absoluteSrcPath);
        const ws = createWriteStream(absoluteDestFilePath);

        const brotliDecompress = createBrotliDecompress();

        try {
          await pipeline(rs, brotliDecompress, ws);
        } catch {
          await rm(absoluteDestFilePath);
          throw new OperationError(`'${initSrcFileName}' is not a Brotli compressed file`);
        }

        console.log(`File '${initSrcFileName}' was successfully decompressed with name '${destFileName}' to directory '${absoluteDestDirName}'!`);
      }
    }
  } catch (error) {
    throw error;
  }
};
