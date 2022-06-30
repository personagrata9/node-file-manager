export const validateFileName = (fileName) => {
  const regExp = new RegExp('[<>:"/\\\\\|\\?\\*]');
  
  return !regExp.test(fileName);
};
