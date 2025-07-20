const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout,
});

readline.question('', (input) => {
  const numbers = input.split(' ').map(Number);
  console.log((numbers[0] + numbers[1]) % numbers[2]);
  console.log(((numbers[0] % numbers[2]) + (numbers[1] % numbers[2])) % numbers[2]);
  console.log((numbers[0] * numbers[1]) % numbers[2]);
  console.log(((numbers[0] % numbers[2]) * (numbers[1] % numbers[2])) % numbers[2]);
  readline.close();
});