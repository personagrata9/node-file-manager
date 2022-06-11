import { access } from 'fs/promises';
import { constants } from 'fs';

export const checkDirentReadable = async (path) => {
  try {
    await access(path, constants.R_OK);
    return true;
  } catch {
    return false;
  }
};