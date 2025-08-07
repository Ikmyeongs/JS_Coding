const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];

readline.on('line', function (line) {
  input.push(line);
}).on('close', function () {
  const num = parseInt(input[0]);
  let result = ""
  for (let i = 1; i <= num; i++) {
    const number = input[i].split(' ').map(Number);
    result += `Case #${i}: ${number[0] + number[1]}\n`;
  }
  console.log(result);
  process.exit();
});