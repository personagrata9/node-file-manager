import { INVALID_INPUT_MESSAGE } from '../constants/invalidInputMessage.js';

export const exit = (args) => {
  if (args.length) {
    console.error(INVALID_INPUT_MESSAGE);
  } else {
    process.exit();
  }
};
