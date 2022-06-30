import { stat } from 'fs/promises';

export const checkFileExist = async (path) => {
  try {
    const dirStat = await stat(path);
    return dirStat.isFile();
  } catch {
    return false;
  }
};
