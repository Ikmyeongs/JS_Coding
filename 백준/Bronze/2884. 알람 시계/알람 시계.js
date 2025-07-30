const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout,
});

let input = [];

readline.question('', (input) => {
    const time = input.split(' ').map(Number);
    time[1] -= 45;
    if (time[1] < 0) {
        time[0] -= 1;
        time[1] += 60;
    }
    
    if (time[0] <= -1) {
        time[0] += 24;
    }
    console.log(time[0], time[1]);
    readline.close();
});