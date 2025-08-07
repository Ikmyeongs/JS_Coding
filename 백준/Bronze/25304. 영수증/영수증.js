const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout,
});

let input = [];

readline.on('line', function(line) {
    input.push(line);
}).on('close', function() {
    const x = parseInt(input[0]);
    const n = parseInt(input[1]);
    let sum = 0;
    
    for(i = 2; i <= n + 1; i++) {
        const [price, count] = input[i].split(' ').map(Number);
        sum += price * count;
    }
    
    if(x == sum) {
        console.log("Yes");
    }
    else if(x != sum) {
        console.log("No");
    }
});