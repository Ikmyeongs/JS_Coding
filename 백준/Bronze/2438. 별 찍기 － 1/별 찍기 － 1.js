const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];

readline.on('line', function (line) {
  input.push(line);
}).on('close', function () {
  const num = parseInt(input[0]);
  let result = '';
  for (let i = 1; i <= num; i++) {
      for(let j = 1; j <= i; j++) {
          result += "*";
      }
      result += '\n';
  }
  console.log(result);
  process.exit();
});