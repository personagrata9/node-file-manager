import { homedir } from 'os';
import { getUserName } from './general/getUserName.js';
import * as readline from 'readline';
import { parseCli } from './general/parseCli.js';
import { CURRENT_PATH_MESSAGE, EXIT_MESSAGE, WELCOME_MESSAGE } from './consts/messages.js';

const startApp = () => {
  const args = process.argv.slice(2);
  const userName = getUserName(args);

  process.stdout.write(`${WELCOME_MESSAGE}${userName}!\n\n`);

  process.chdir(homedir());
  process.stdout.write(`${CURRENT_PATH_MESSAGE}${process.cwd()}\n`);

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  rl.prompt();

  rl.on('line', async (input) => {
    const currentDirPath = await parseCli(input);
    process.chdir(currentDirPath);
    process.stdout.write(`\n${CURRENT_PATH_MESSAGE}${process.cwd()}\n`);

    rl.prompt();
  });

  rl.on('close', () => {
    process.stdout.write(`${EXIT_MESSAGE}${userName}!\n`);
  });
};

startApp();
