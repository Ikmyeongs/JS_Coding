const rl = require("readline").createInterface({
	input: process.stdin,
	output: process.stdout,
});

let input = [];

rl.on("line", (line) => {
    input.push(parseInt(line));
});

rl.on("close", () => {
	let max = 0;
    let maxIndex = 0;
    
    for(let i = 0; i <= input.length ; i++){
        if (max < input[i]) {
            max = input[i];
            maxIndex = i + 1;
        }
    }
    console.log(max);
    console.log(maxIndex);
	process.exit();
});