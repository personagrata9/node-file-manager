export const getFileExtensions = (fileName) => {
  const dotIndex = fileName.indexOf('.');
  if (dotIndex !== -1) {
    return fileName.slice(dotIndex);
  } else {
    return '';
  }
};
