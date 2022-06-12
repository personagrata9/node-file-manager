import { NO_ARGS_MESSAGE } from '../consts/messages.js';
import { InputError } from '../utils/customErrors.js';

export const exit = (args) => {
  try {
    if (args.length) {
      throw new InputError(NO_ARGS_MESSAGE);
    } else {
      process.exit();
    }
  } catch (error) {
    throw error;
  }
};
