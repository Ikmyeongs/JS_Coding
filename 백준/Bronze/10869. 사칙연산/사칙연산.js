const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout,
});

readline.question('', (input) => {
  const numbers = input.split(' ').map(Number);
  console.log(numbers[0] + numbers[1]);
  console.log(numbers[0] - numbers[1]);
  console.log(numbers[0] * numbers[1]);
  console.log(Math.floor(numbers[0] / numbers[1]));
  console.log(numbers[0] % numbers[1]);
  readline.close();
});