const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout,
});

readline.question('', (input) => {
  const number = input.split('').map(Number);
      for(let i = 1; i<=9; i++) {
          const result = number * i;
          console.log(`${number} * ${i} = ${result}`);
      }
    readline.close();
});