import { homedir } from 'os';
import { getUserName } from './general/getUserName.js';

import * as readline from 'readline';
import { parseCli } from './general/parseCli.js';

const startApp = () => {
  const args = process.argv.slice(2);
  const userName = getUserName(args);
  const welcomeMessage = `Welcome to the File Manager, ${userName}!\n`;
  const exitMessage = `\nThank you for using File Manager, ${userName}!\n`

  process.stdout.write(`${welcomeMessage}\n`);

  process.chdir(homedir());
  process.stdout.write(`You are currently in ${process.cwd()}\n`);

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  rl.prompt();

  rl.on('line', async (input) => {
    const currentDirPath = await parseCli(input);
    process.chdir(currentDirPath);
    process.stdout.write(`\nYou are currently in ${process.cwd()}\n`);

    rl.prompt();
  });

  rl.on('close', () => {
    process.stdout.write(exitMessage);
  });
};

startApp();
