const rl = require("readline").createInterface({
	input: process.stdin,
	output: process.stdout,
});

let input = [];
let count = 0;

rl.on("line", (line) => {
    input.push(line);
});

rl.on("close", () => {
	const n = parseInt(input[0]);
    const numbers = input[1].split(' ').map(Number);
    const searchNum = parseInt(input[2]);
    
    for(let i = 0; i < n ; i++){
        if (numbers[i] === searchNum) {
            count++;
        }
    }
    console.log(count);
	process.exit();
});

