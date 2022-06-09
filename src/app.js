import { homedir } from 'os';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { fork } from 'child_process';
import { getUserName } from './general/getUserName.js';

const startApp = () => {
  const args = process.argv.slice(2);
  const userName = getUserName(args);
  const welcomeMessage = `Welcome to the File Manager, ${userName}!\n`;
  const exitMessage = `\nThank you for using File Manager, ${userName}!\n`

  const __dirname = fileURLToPath(new URL('.', import.meta.url));
  const childPath = join(__dirname, 'general', 'parseCli.js');

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