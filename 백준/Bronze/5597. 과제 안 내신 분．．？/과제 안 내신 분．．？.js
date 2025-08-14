const rl = require("readline").createInterface({
	input: process.stdin,
	output: process.stdout,
});

let input = [];
const students = Array(30).fill(1).map((value, index) => value = index + 1);

rl.on("line", (line) => {
    input.push(parseInt(line));
});

rl.on("close", () => {
	 for (let i = 0; i < input.length; i++) {
        const index = students.indexOf(input[i]);
        if (index > -1) {
            students.splice(index, 1);
           }
     }
    
    students.sort((a, b) => a - b);

  for (let i = 0; i < students.length; i++) {
    console.log(students[i]);
  }
         
  process.exit();
});