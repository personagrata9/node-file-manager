import { list } from '../nwd/ls.js';
import { goToFolder } from '../nwd/cd.js';
import { goUp } from '../nwd/up.js';

let currentDir = process.cwd();

const parseCli = async (input) => {
  const inputStringified = input.toString().trim();

  if (inputStringified === '.exit') {
    process.exit();
  } else if (inputStringified === 'up') {
    currentDir = goUp(currentDir);
  } else if (inputStringified.startsWith('cd ')) {
    const dirPath = inputStringified.split(' ')[1];
    currentDir = await goToFolder(currentDir, dirPath);
  } else if (inputStringified === 'ls') {
    await list(currentDir);
  } else {
    process.stdout.write('Invalid input\n');
  }

  process.stdout.write(`You are currently in ${currentDir}\n`);
};

process.stdin.on('data', parseCli);