import { isAbsolute, join, normalize, resolve } from 'path';

export const getAbsolutePath = (currentDir, direntPath) => {
  let absolutePath;

  if (isAbsolute(direntPath)) {
    absolutePath = direntPath;
  } else {
    absolutePath = join(currentDir, direntPath);
  }

  return normalize(resolve(absolutePath));
};
