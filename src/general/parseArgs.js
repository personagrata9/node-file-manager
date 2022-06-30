export  const parseArgs = (argsArray) => {
  const args = [];
  let acc = '';

  argsArray.forEach((arg) => {
    if (arg.startsWith('"') && arg.endsWith('"')) {
      args.push(arg.slice(1, -1));
    } else if (arg.startsWith('"')) {
      acc = arg.slice(1);
    } else if (arg.endsWith('"')){
      acc = `${acc} ${arg.slice(0, arg.length - 1)}`;
      args.push(acc);
      acc = '';
    } else {
      if (acc) {
        acc = `${acc} ${arg}`;
      } else {
        args.push(arg);
      }
    }
  });

  return args;
};
