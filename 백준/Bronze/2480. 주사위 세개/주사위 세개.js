const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout,
});

readline.question('', (input) => {
    const dice = input.split(' ').map(Number);
    const [a, b, c] = dice;
    if (a == b && b == c) {
        console.log(10000 + a * 1000);
    }
    else if (a == b || a == c) {
        console.log(1000 + a * 100);
    }
    else if (b == c) {
        console.log(1000 + b * 100);
    }
    else {
        console.log(Math.max(a, b, c) * 100);
    }
    readline.close();
});