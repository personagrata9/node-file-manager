import { INVALID_INPUT_MESSAGE } from '../consts/messages.js';

export const exit = (command, args) => {
  if (args.length) {
    console.error(`${INVALID_INPUT_MESSAGE}: command ${command} expects no arguments!`);
  } else {
    process.exit();
  }
};
