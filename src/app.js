import { getUserName } from './general/getUserName.js';
import { homedir } from 'os';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { fork } from 'child_process';


const startApp = () => {
  const args = process.argv.slice(2);
  const userName = getUserName(args);
  const welcomeMessage = `Welcome to the File Manager, ${userName}!\n`;
  const exitMessage = `Thank you for using File Manager, ${userName}!\n`

  const __dirname = fileURLToPath(new URL('.', import.meta.url));
  const childPath = path.join(__dirname, 'general', 'parseCli.js');

  process.stdout.write(`${welcomeMessage}\n`);

  process.chdir(homedir());
  process.stdout.write(`You are currently in ${process.cwd()}\n`);

  fork(childPath);

  process.on('exit', () => {
    process.stdout.write(exitMessage);
  });

  process.on('SIGINT', () => {
    process.exit();
  });
};

startApp();