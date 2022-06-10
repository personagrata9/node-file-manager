import { EOL, cpus, homedir, userInfo, arch } from 'os';
import { parseCpusInfo } from './parseCpusInfo.js';
import { ERROR_MESSAGE } from '../consts/messages.js';
import { INVALID_INPUT_MESSAGE } from '../consts/messages.js';

export const printOsInfo = (command, args) => {
  try {
    if (args.length !== 1) {
      throw new Error(`${INVALID_INPUT_MESSAGE}: command ${command} expects one argument!`);
    } else {
      const arg = args.join('');

      let result;

      switch (arg) {
        case '--EOL':
          result = JSON.stringify(EOL);
          break;
        case '--cpus':
          result = parseCpusInfo(cpus());
          break;
        case '--homedir':
          result = homedir();
          break;
        case '--username':
          result = userInfo().username;
          break;
        case '--architecture':
          result = arch();
          break;
        default:
          throw new Error(ERROR_MESSAGE);
      }

      if (result) console.log(result);
    }
  } catch (error) {
    console.error(error.message);
  }
};
