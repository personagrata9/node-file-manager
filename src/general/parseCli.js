import { exit } from './exit.js';
import { goUp } from '../nwd/up.js';
import { goToDir } from '../nwd/cd.js';
import { list } from '../nwd/ls.js';
import { readFile } from '../fs/cat.js';
import { createFile } from '../fs/add.js';
import { renameFile } from '../fs/rn.js';
import { copyFile } from '../fs/cp.js';
import { deleteFile } from '../fs/rm.js';
import { printOsInfo } from '../os/printOsInfo.js';
import { printHash } from '../hash/printHash.js';
import { INVALID_INPUT_MESSAGE } from '../consts/messages.js';

export const parseCli = async (input) => {
  const inputStringified = input.toString().trim();
  const inputArray = inputStringified.split(' ');
  const command = inputArray[0];
  const args = inputArray.slice(1);
  let currentDirPath = process.cwd();

  switch (command) {
    case '.exit':
      exit(args);
      break;
    case 'up':
      currentDirPath = goUp(currentDirPath, args);
      break;
    case 'cd':
      currentDirPath = await goToDir(currentDirPath, args);
      break;
    case 'ls':
      await list(currentDirPath, args);
      break;
    case 'cat':
      await readFile(currentDirPath, args);
      break;
    case 'add':
      await createFile(currentDirPath, args);
      break;
    case 'rn':
      await renameFile(currentDirPath, args);
      break;
    case 'cp':
      await copyFile(currentDirPath, args, { move: false });
      break;
    case 'mv':
      await copyFile(currentDirPath, args, { move: true });;
      break;
    case 'rm':
      await deleteFile(currentDirPath, args);
      break;
    case 'os':
      printOsInfo(args);
      break;
    case 'hash':
      await printHash(currentDirPath, args);
      break;
    default:
      console.error(`${INVALID_INPUT_MESSAGE}: command not found!`);
  }

  return currentDirPath;
};
