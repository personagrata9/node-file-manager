import { homedir } from 'os';
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
import { checkDirExist } from '../utils/checkDirExist.js';
import { CustomError, InputError } from '../utils/customErrors.js';
import { OPERATION_ERROR_MESSAGE } from '../consts/messages.js';

export const parseCli = async (input) => {
  let currentDirPath = process.cwd(); 

  try {  
    const inputStringified = input.toString().trim();
    const inputArray = inputStringified.split(' ');
    const command = inputArray[0];
    const argsArray = inputArray.slice(1);
    const args = parseArgs(argsArray);

    switch (command) {
      case '.exit':
        exit(args);
        break;
      case 'up':
        currentDirPath = await goUp(currentDirPath, args);
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
      case 'compress':
        await compress(currentDirPath, args);
        break;
      case 'decompress':
        await decompress(currentDirPath, args);
        break;
      default:
        throw new InputError(`command not found`);
      
    }
  } catch (error) {
    if (error instanceof CustomError) {
      console.error(error.message);
    } else {
      console.error(OPERATION_ERROR_MESSAGE);
    }
  }

  const isDirExist = await checkDirExist(currentDirPath);
  if (!isDirExist) currentDirPath = homedir();

  return currentDirPath;
};
