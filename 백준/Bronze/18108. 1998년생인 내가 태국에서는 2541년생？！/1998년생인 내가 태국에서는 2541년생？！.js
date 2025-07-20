const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout,
});

readline.question('', (input) => {
  const number = input.split(' ').map(Number);
  console.log(number[0]-543);
  readline.close();
});