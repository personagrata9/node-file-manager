import { convertMhzToGhz } from '../utils/ConvertMHzToGHz.js';

export const parseCpusInfo = (cpus) => {
  const result = cpus.map(({ model, speed }) => ({
    model,
    speed: convertMhzToGhz(speed)
  }));
  
  return result;
};
