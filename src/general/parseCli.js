import { exit } from './exit.js';
import { goUp } from '../nwd/up.js';
import { goToDir } from '../nwd/cd.js';
import { list } from '../nwd/ls.js';
import { readFile } from '../files_operations/cat.js';
import { createFile } from '../files_operations/add.js';
import { renameFile } from '../files_operations/rn.js';
import { copyFile } from '../files_operations/cp.js';
import { moveFile } from '../files_operations/mv.js';
import { deleteFile } from '../files_operations/rm.js';
import { INVALID_INPUT_MESSAGE } from '../constants/invalidInputMessage.js';

let currentDirPath = process.cwd();

const parseCli = async (input) => {
  const inputStringified = input.toString().trim();
  const inputArray = inputStringified.split(' ');
  const command = inputArray[0];
  const args = inputArray.slice(1);

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
      await copyFile(currentDirPath, args, false);
      break;
    case 'mv':
      await moveFile(currentDirPath, args);
      break;
    case 'rm':
      await deleteFile(currentDirPath, args, false);
      break;
    default:
      console.error(`${INVALID_INPUT_MESSAGE}: command not found!`);
  }

  process.stdout.write(`\nYou are currently in ${currentDirPath}\n`);
};

process.stdin.on('data', parseCli);