const readline = require('readline').createInterface({
       input: process.stdin,
       output: process.stdout,
   });

readline.question('', (input) => {
  const num = input.split(' ').map(Number);
  if(num[0] < num[1]) {
      console.log(`<`);
  } else if(num[0] == num[1]) {
      console.log(`==`);
  } else if(num[0] > num[1]) {
      console.log(`>`);
  }
    readline.close();
});
 