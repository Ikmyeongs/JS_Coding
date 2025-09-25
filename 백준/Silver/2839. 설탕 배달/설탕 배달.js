// 1. 최소 봉지값 구하기
// 2. 가장 먼저 5 (greedy)

const rl = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.on("line", (line) => {
  const input = parseInt(line); // input값 받기.
    
  function solution(input) { // 설탕값을 입력 받으면 출력하는 함수
    for(let bigSize = Math.floor(input / 5); bigSize >= 0; bigSize--)  { // 일단 입력값에서 5kg 먼저 담기.
    // 처음엔 큰 봉투에 다 담고, 점진적 하향.
      const remainSugar = input - bigSize * 5; // 남은 설탕 계산
      if(remainSugar % 3 === 0) { // 이번엔 3kg 설탕으로 나눌 수 있는지 보기
        const smallSize = remainSugar / 3; // 나눌 수 있다면 담아넣기. 이미 남은게 정수니까 이번엔 Math 불필요.
        return bigSize + smallSize; // 조건으로 0이 되었으니 정답 도출 완료!
      }          
    }
    return -1; // 만약 for문 돌렸는데 0으로 안 나눠진다 하면 -1(실패) 반환...
  }
  console.log(solution(input));
  
  rl.close();
});
