const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout,
});

readline.question('', (input) => {
    const years = input.split(' ').map(Number);
    if((years % 4 == 0) && (years % 100 != 0) || (years % 400 == 0)) {
        console.log('1');
        }
    else {
        console.log('0');
        }
    readline.close();
});