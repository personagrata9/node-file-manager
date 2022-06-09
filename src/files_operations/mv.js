import { copyFile } from './cp.js';
import { deleteFile } from './rm.js';

export const moveFile = async (currentDirPath, args) => {
  await copyFile(currentDirPath, args, true);
  await deleteFile(currentDirPath, [args[0]], true);
};
