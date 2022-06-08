import * as path from 'path';

export const goUp = (currentDir) => {
  const rootDir = path.parse(process.cwd()).root;
  const newDir = (currentDir !== rootDir) && (currentDir.indexOf('/') !== currentDir.lastIndexOf('/'))
    ? currentDir.slice(0, currentDir.lastIndexOf('/'))
    : rootDir;

  return newDir;
};