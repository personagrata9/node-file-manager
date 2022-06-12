import { dirname, basename, join }  from 'path';
import { createReadStream, createWriteStream } from 'fs';
import { pipeline } from 'stream/promises';
import { rm } from 'fs/promises';
import { getAbsolutePath } from '../utils/getAbsolutePath.js';
import { checkDirentExist } from '../utils/checkDirentExist.js';
import { checkFileExist } from '../utils/checkFileExist.js';
import { checkDirExist } from '../utils/checkDirExist.js';
import { checkDirentReadable } from '../utils/checkDirentReadable.js';
import { checkDirentWritable } from '../utils/checkDirentWritable.js';
import {
  DirentNotExistError,
  FileAlreadyExistError,
  InputError,
  NotDirectoryError,
  NotFileError,
  PermissionError
} from '../utils/customErrors.js';
import { TWO_ARGS_MESSAGE } from '../consts/messages.js';

export const copyFile = async (currentDirPath, args, options) => {
  const { move } = options;
  
  try {
    if (args.length !== 2) {
      throw new InputError(TWO_ARGS_MESSAGE);
    } else {
      const srcFilePath = args[0];
      const absoluteSrcPath = getAbsolutePath(currentDirPath, srcFilePath);
      const srcDirName = dirname(absoluteSrcPath);
      const srcFileName = basename(absoluteSrcPath);

      const newDirPath = args[1];
      const absoluteNewDirPath = getAbsolutePath(currentDirPath, newDirPath);
      const absoluteDestPath = join(absoluteNewDirPath, srcFileName);

      const isSrcExist = await checkDirentExist(absoluteSrcPath);
      const isSrcFile = await checkFileExist(absoluteSrcPath);
      const isSrcFileReadable = await checkDirentReadable(absoluteSrcPath);

      const isNewDirExist = await checkDirentExist(absoluteNewDirPath);
      const isDestDirectory = await checkDirExist(absoluteNewDirPath);
      const isDestDirWritable = await checkDirentWritable(absoluteNewDirPath);
      const isDestExist = await checkDirentExist(absoluteDestPath);

      if (!isSrcExist) {
        throw new DirentNotExistError(absoluteSrcPath);
      } else if (!isSrcFile) {
        throw new NotFileError(srcFileName);
      } else if (!isNewDirExist) {
        throw new DirentNotExistError(absoluteNewDirPath);
      } else if (!isDestDirectory) {
        throw new NotDirectoryError(absoluteNewDirPath);
      } else if (!isSrcFileReadable || !isDestDirWritable) {
        throw new PermissionError();
      } else if (isDestExist) {
        throw new FileAlreadyExistError(srcFileName, absoluteNewDirPath);
      } else {
        const rs = createReadStream(absoluteSrcPath);
        const ws = createWriteStream(absoluteDestPath);
        
        await pipeline(rs, ws);

        const operation = move ? 'moved' : 'copied';
        const successMessage = `File '${srcFileName}' was successfully ${operation} from directory '${srcDirName}' to directory '${absoluteNewDirPath}'!`;

        if (move) await rm(absoluteSrcPath);

        console.log(successMessage);
      }
    } 
  } catch (error) {
    throw error;
  }
};
