const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout,
});

readline.question('', (input) => {
    const n = parseInt(input);
    let result = '';
    
    for (let i = 0; i < n / 4; i++) {
        result += 'long ';
    }
    result += 'int';
    console.log(result);
    readline.close();
});