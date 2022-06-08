import { parse, normalize } from 'path';

export const goUp = (currentDir) => {
  const { root, dir } = parse(currentDir);
  const newDir = normalize(`${root}${dir}`);

  return newDir;
};