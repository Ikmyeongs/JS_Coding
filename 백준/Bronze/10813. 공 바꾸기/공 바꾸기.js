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
     const baskets = Array(n + 1).fill(0).map((value, index) => index);

     for (let i = 1; i <= m; i++) {
         const [a, b] = input[i].split(' ').map(Number);
         [baskets[a], baskets[b]] = [baskets[b], baskets[a]];
     }
    
  console.log(baskets.slice(1).join(' '));
  process.exit();
});