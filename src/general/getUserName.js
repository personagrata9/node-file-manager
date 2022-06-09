export const getUserName = (args) => {
  const defaultUserName = 'unkhown user';
  let userName;

  if (args.length) {
    const prefix = '--username=';
    const userNameArg = args.find((arg) => arg.startsWith(prefix));
    userName = userNameArg ? userNameArg.slice(prefix.length) : undefined;
  }

  return userName || defaultUserName;
};
