const readline = require('readline').createInterface({
       input: process.stdin,
       output: process.stdout,
   });

readline.question('', (input) => {
  const num = input.split(' ').map(Number);
  if(num[0] <= 100 && num[0] >= 90) {
      console.log("A");
  } else if(num[0] <= 89 && num[0] >= 80) {
      console.log("B");
  } else if(num[0] <= 79 && num[0] >= 70) {
      console.log("C");
  } else if(num[0] <= 69 && num[0] >= 60) {
      console.log("D");
  } else {
      console.log("F");
  }
    readline.close();
});
 