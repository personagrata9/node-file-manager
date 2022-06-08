import { homedir } from 'os';
import { getAbsolutePath } from '../utils/getAbsolutePath.js';
import { checkDirentExist } from '../utils/checkDirentExist.js';
import { stat } from 'fs/promises';
import { ERROR_MESSAGE } from '../constants/errorMessage.js';

export const goToDir = async (currentDir, direntPath) => {
  let newDir;

  try {
    if (!direntPath || direntPath === '~') {
      newDir = homedir();
    } else {
      newDir = getAbsolutePath(currentDir, direntPath);

      const isDirentExist = await checkDirentExist(newDir);

      if (!isDirentExist) {
        newDir = currentDir;
        throw new Error(`${ERROR_MESSAGE}: directory doesn't exist!`);
      } else {
        const newDirStat = await stat(newDir);
      
        if (!newDirStat.isDirectory()) {
          newDir = currentDir;
          throw new Error(`${ERROR_MESSAGE}: not a directory!`);
        }
      }
    }
  } catch (error) {
    console.error(error.message);
  }

  return newDir;
}