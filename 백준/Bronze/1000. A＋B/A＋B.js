const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout,
});

readline.question('', (input) => {
  const numbers = input.split(' ').map(Number);
  const sum = numbers[0] + numbers[1];
  console.log(sum);
  readline.close();
});