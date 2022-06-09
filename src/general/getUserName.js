export const getUserName = (args) => {
  const defaultUserName = 'unkhown user';
  let userName;

  if (args.length) {
    const prefix = '--username=';
    const prefixIndex = args.findIndex((arg) => arg.startsWith(prefix));
    userName = prefixIndex !== -1
      ? args[prefixIndex].slice(prefix.length).concat(' ', args.slice(prefixIndex + 1).join(' '))
      : undefined;
  }

  return userName || defaultUserName;
};
