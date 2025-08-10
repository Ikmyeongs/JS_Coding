const rl = require("readline").createInterface({
	input: process.stdin,
	output: process.stdout,
});

let input = [];

rl.on("line", (line) => {
    input.push(line);
});

rl.on("close", () => {
	const n = input[0].split(' ').map(Number);
    const numbers = input[1].split(' ').map(Number);
    let result = '';
    
    for(let i = 0; i < n[0] ; i++){
        if (numbers[i] < n[1]) {
            result += numbers[i] + " ";
        }
    }
    console.log(result);
	process.exit();
});