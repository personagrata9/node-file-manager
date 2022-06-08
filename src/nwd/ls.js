import { checkDirentExist } from './check-dirent-exist.js';
import { readdir } from 'fs/promises';

export const list = async (folderPath) => {
  const errorMessage = 'Operation failed';

  try {
    const isFolderExist = await checkDirentExist(folderPath);

    if (!isFolderExist) {
      throw new Error(errorMessage);
    } else {
      const dirents = await readdir(folderPath, { withFileTypes: true });
      const result = dirents.map((dirent) => dirent.name);
      console.log(result);
    }
  } catch (error) {
    console.error(error.message);
  }
};