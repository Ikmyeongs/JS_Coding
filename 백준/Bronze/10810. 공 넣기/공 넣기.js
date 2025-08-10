const rl = require("readline").createInterface({
	input: process.stdin,
	output: process.stdout,
});

let input = [];

rl.on("line", (line) => {
    input.push(line);
});

rl.on("close", () => {
	const [n, m] = input[0].split(' ').map(Number);
    const result = new Array(n).fill(0);
    
    for(let a = 1; a <= m ; a++){
        const [i, j, k] = input[a].split(' ').map(Number);
        for(let index = i - 1; index < j; index++) {
            result[index] = k;
        }
    }
    console.log(result.join(" "));
	process.exit();
});
