import { EOL, cpus, homedir, userInfo, arch } from 'os';
import { parseCpusInfo } from './parseCpusInfo.js';
import { InputError, OperationError } from '../utils/customErrors.js';
import { ONE_ARG_MESSAGE } from '../consts/messages.js';

export const printOsInfo = (args) => {
  try {
    if (args.length !== 1) {
      throw new InputError(ONE_ARG_MESSAGE);
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
          throw new OperationError('invalid argument');
      }

      if (result) console.log(result);
    }
  } catch (error) {
    throw error;
  }
};
