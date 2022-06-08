import * as path from 'path';
import { goUp } from './up.js';
import { checkDirentExist } from './checkDirentExist.js';
import { stat } from 'fs/promises';
import { ERROR_MESSAGE } from '../constants.js/errorMessage.js';

export const goToFolder = async (currentDir, dirPath) => {
  const rootDir = path.parse(process.cwd()).root;
  let newDir;

  try {
    if (dirPath.startsWith(rootDir)) {
      newDir = dirPath;
    } else {
      newDir = dirPath.split('/').reduce((acc, folder) => {
        if (folder && folder === '..') {
          acc = goUp(acc);
        } else if (folder && folder !== '.') {
          acc = acc === rootDir ? `${acc}${folder}` : `${acc}/${folder}`;
        } 
        return acc;
      }, currentDir);
    }

    const isDirentExist = await checkDirentExist(newDir);

    if (!isDirentExist) {
      newDir = currentDir;
      throw new Error(`${ERROR_MESSAGE}: directory doesn't exist!`);
    } else {
      const newDirStat = await stat(newDir);
      
      if (!newDirStat.isDirectory()) {
        newDir = currentDir;
        throw new Error(`${ERROR_MESSAGE}: not a directory!`);
      } else {
        newDir = path.resolve(newDir);
      }
    }
   
  } catch (error) {
    console.error(error.message);
  }

  return newDir;
}