const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout,
});

let input = [];

readline.on('line', (line) => {
    input.push(line);
    }).on('close', () => {
        const [hour, minute] = input[0].split(' ').map(Number);
        const cookTime = Number(input[1]);

        let totalMinutes = (hour * 60) + minute + cookTime;
        let newHour = Math.floor(totalMinutes / 60);
        let newMinute = totalMinutes % 60;

        if (newHour >= 24) {
            newHour -= 24;
        }

    console.log(newHour, newMinute);
});
