const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];

readline.on('line', function (line) {
  input.push(line);
}).on('close', function () {
  const num = parseInt(input[0]);
  for (let i = 1; i <= num; i++) {
    const [a, b] = input[i].split(' ').map(Number);
    console.log(a + b);
  }
  process.exit();
});