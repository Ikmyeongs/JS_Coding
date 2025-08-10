const rl = require("readline").createInterface({
	input: process.stdin,
	output: process.stdout,
});

let input = [];

rl.on("line", (line) => {
    input.push(line);
});

rl.on("close", () => {
	const n = parseInt(input[0]);
    const numbers = input[1].split(' ').map(Number);
    let min = numbers[0];
    let max = numbers[0];
    
    for(let i = 1; i < n; i++) {
        if (min > numbers[i]) {
            min = numbers[i];
        }
        if (max < numbers[i]) {
            max = numbers[i];
        }
    }
    console.log(min, max);
	process.exit();
});