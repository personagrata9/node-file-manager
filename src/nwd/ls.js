import { checkDirentExist } from './checkDirentExist.js';
import { readdir } from 'fs/promises';

export const list = async (folderPath) => {
  try {
    const isFolderExist = await checkDirentExist(folderPath);

    if (!isFolderExist) {
      throw new Error(`${ERROR_MESSAGE}: directory doesn't exist!`);
    } else {
      const dirents = await readdir(folderPath, { withFileTypes: true });
      const result = dirents.map((dirent) => dirent.name);
      console.log(result);
    }
  } catch (error) {
    console.error(error.message);
  }
};