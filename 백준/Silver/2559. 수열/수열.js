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

function solution(input) {
  const [N, K] = input[0].split(' ').map(Number); // N, K 입력 받음.
  const temp = input[1].split(' ').map(Number); // 온도 저장.
  
  let start = 0; // 구간 시작 값 설정
  let end = start + K // 구간 종료 값.
  let maxTemp = -Infinity; // -값도 있으므로 초기값을 -무한대로 잡음.
  
  while(end <= N) { // end 값이 N안에 있는 동안 순회
    let curTemp = 0; // 현재 구간 온도 합 설정.
    for (let i = start; i < end; i++) {
      curTemp += temp[i]; // 구간 만큼 합침.
    }
    maxTemp = Math.max(maxTemp, curTemp); // max값 갱신
    start++; // 다음 시작 지점
    end++; // 다음 종료 지점
  }
  console.log(maxTemp);
}