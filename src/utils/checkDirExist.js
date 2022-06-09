import { stat } from 'fs/promises';

export const checkDirExist = async (path) => {
  try {
    const dirStat = await stat(path);
    return dirStat.isDirectory();
  } catch {
    return false;
  }
};