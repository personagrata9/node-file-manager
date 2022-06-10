import { INVALID_INPUT_MESSAGE } from '../consts/messages.js';

export const exit = (args) => {
  if (args.length) {
    console.error(INVALID_INPUT_MESSAGE);
  } else {
    process.exit();
  }
};
