const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];

readline.on('line', function (line) {
  input.push(line);
}).on('close', function () {
  for (let i = 0; i < input.length; i++) {
    const [a, b] = input[i].split(' ').map(Number);
    if(a!=0 && b!=0)
    console.log(a+b);
    
    if(a==0 && b==0)
    break;
  }
  process.exit();
});