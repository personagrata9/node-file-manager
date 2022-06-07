const parseCli = (input) => {
  const chunkStringified = input.toString().trim();

  if (chunkStringified === '.exit') {
    process.exit();
  } else {
    process.stdout.write('Invalid input\n');
  }

  process.stdout.write(`You are currently in ${process.cwd()}\n`);
};

process.stdin.on('data', parseCli);