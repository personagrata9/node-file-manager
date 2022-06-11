import { access } from 'fs/promises';
import { constants } from 'fs';

export const checkDirentWritable = async (path) => {
  try {
    await access(path, constants.W_OK);
    return true;
  } catch {
    return false;
  }
};