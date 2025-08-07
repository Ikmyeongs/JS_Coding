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
    const sum = number[0] + number[1];
    result += `Case #${i}: ${number[0]} + ${number[1]} = ${sum}\n`;
  }
  console.log(result);
  process.exit();
});