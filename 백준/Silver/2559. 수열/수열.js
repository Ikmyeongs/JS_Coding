// 1. 입력값 N은 전체 측정 날짜 수, K는 연속적인 날짜의 수, 둘째 줄에 각 날짜의 측정 온도.
// 2. 출력은 전체 N에서 연속적인 K일 동안 가장 온도 합이 큰것.
// 3. N이 10, K가 2라면 1차원 배열에서 1~2, 2~3, 3~4... 이런식으로 비교를 한 뒤에 가장 큰 것을 갱신하면 되겠네.

const rl = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});
const input = [];

rl.on('line', (line) => {
  input.push(line.trim());
}).on('close', () => {
  solution(input);
});

/* function solution(input) {
  const [N, K] = input[0].split(' ').map(Number); // N, K 입력 받음.
  const temp = input[1].split(' ').map(Number); // 온도 저장.
  
  let start = 0; // 구간 시작 값 설정
  let end = start + K // 구간 종료 값.
  let maxSum = -Infinity; // -값도 있으므로 초기값을 -무한대로 잡음.
  
  while(end <= N) { // end 값이 N안에 있는 동안 순회
    let sumTemp = 0; // 현재 구간 온도 합 설정.
    for (let i = start; i < end; i++) {
      sumTemp += temp[i]; // 구간 만큼 합침.
    }
    maxSum = Math.max(maxSum, sumTemp); // max값 갱신
    start++; // 다음 시작 지점
    end++; // 다음 종료 지점
  }
  console.log(maxTemp);
} */

// 문제는 위 방식은 양끝 계산 빼고는 전값이랑 동일 계산이 들어가 있어서 성능이 안 좋을 수 있음. 개편 필요할 것 같다.
// 생각해보니 굳이 계속 구간을 구할 필요 없이, 전에 구한 구간에 양끝을 빼고 더하면 되는 거 아닌가?

function solution(input) {
  const [N, K] = input[0].split(' ').map(Number); // N, K 입력 받음.
  const temp = input[1].split(' ').map(Number); // 온도 저장.

  let sumTemp = 0; // 여기에 sumTemp 저장하고 
  for (let i = 0; i < K; i++) { // 아애 처음에 초기값을 구한 다음에, 후에 양끝 비교하는 식으로 가자.
    sumTemp += temp[i];
  }
  let maxSum = sumTemp; // 초기 sum도 미리 지정해주자.
    
  for(let i = K; i < N; i++) { // 여기서 그냥 N-K번 만큼 돌려서 비교하는게 나을거 같음.
    sumTemp = sumTemp - temp[i-K] + temp[i];
    // 이렇게 하면 sumTemp가 전값을 빼고 다음 끝값을 더해서 길이도 유지하며, 다음 구간의 합이 됨.
    maxSum = Math.max(maxSum, sumTemp); // 그리고 나서 갱신 비교하면 됨!
  }
  console.log(maxSum);
}