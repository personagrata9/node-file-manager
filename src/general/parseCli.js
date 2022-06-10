import { parseArgs } from './parseArgs.js';
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
import { compress } from '../zip/compress.js';
import { decompress } from '../zip/decompress.js';
import { INVALID_INPUT_MESSAGE } from '../consts/messages.js';

export const parseCli = async (input) => {
  const inputStringified = input.toString().trim();
  const inputArray = inputStringified.split(' ');
  const command = inputArray[0];
  const argsArray = inputArray.slice(1);
  const args = parseArgs(argsArray);

  let currentDirPath = process.cwd();

  switch (command) {
    case '.exit':
      exit(command, args);
      break;
    case 'up':
      currentDirPath = goUp(command, currentDirPath, args);
      break;
    case 'cd':
      currentDirPath = await goToDir(command, currentDirPath, args);
      break;
    case 'ls':
      await list(command, currentDirPath, args);
      break;
    case 'cat':
      await readFile(command, currentDirPath, args);
      break;
    case 'add':
      await createFile(command, currentDirPath, args);
      break;
    case 'rn':
      await renameFile(command, currentDirPath, args);
      break;
    case 'cp':
      await copyFile(command, currentDirPath, args, { move: false });
      break;
    case 'mv':
      await copyFile(command, currentDirPath, args, { move: true });;
      break;
    case 'rm':
      await deleteFile(command, currentDirPath, args);
      break;
    case 'os':
      printOsInfo(command, args);
      break;
    case 'hash':
      await printHash(command, currentDirPath, args);
      break;
    case 'compress':
      await compress(command, currentDirPath, args);
      break;
    case 'decompress':
      await decompress(command, currentDirPath, args);
      break;
    default:
      console.error(`${INVALID_INPUT_MESSAGE}: command not found!`);
  }

  return currentDirPath;
};
