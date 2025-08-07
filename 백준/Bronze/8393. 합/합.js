const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout,
});



readline.question('', (input) => {
    const num = input.split(' ').map(Number);
    let result = 0;
    for(let i = 1; i <= num; i++) {
        result = result + i;
    }
    console.log(result);
    readline.close();
});