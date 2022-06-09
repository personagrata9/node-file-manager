import { access } from 'fs/promises';

export const checkDirentExist = async (path) => {
  try {
    await access(path);
    return true;
  } catch {
    return false;
  }
};
