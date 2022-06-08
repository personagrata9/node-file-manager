import { parse, normalize, join } from 'path';

const rootDir = parse(process.cwd()).root;

export const getAbsolutePath = (currentDir, direntPath) => {
  let absolutePath;

  if (direntPath.startsWith(rootDir)) {
    absolutePath = direntPath;
  } else {
    absolutePath = join(currentDir, direntPath);
  }

  return normalize(absolutePath);
};