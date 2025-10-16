// 1. 입력값 + 1에 퇴사. 그 사이 동안 벌 수 있는 금액의 최대값 찾기.
// 2. 가장 간단하게, 모든 것을 다 해보고 거기서 max를 구하면 되지 않을까?
// 3. 근데 재귀를 쓰면 더 쉽게 탐색될 것 같은데, dfs 방식을 해보자.

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
  const N = parseInt(input[0]); // 첫 입력값
  const counsel = []; // 상담 일정 저장용

  for (let i = 1; i <= N; i++) { // 입력값 순회하면서 상담 일정표 작성
    const [t, p] = input[i].split(' ').map(Number);
    counsel.push({ t, p }); // 객체로 하는게, 2차원 배열보다 직관적 접근 가능.
  }

  let maxMoney = 0; // 최댓값 갱신용

  function dfs(day, money) {
    if (day > N) return; // N보다 크면 퇴사해서 못함.
      
    maxMoney = Math.max(maxMoney, money); // 금액 판별 후 갱신.

    for (let i = day; i < N; i++) { // for문으로 순회해서 재귀 들어감.
      const nextCounsel = i + counsel[i].t; // 수락 받았을 시에 일 수를 계산해봄.
      if (nextCounsel <= N) { // 만약 퇴사하기 전에 할 수 있다?
        dfs(nextCounsel, money + counsel[i].p);  // 상담 수락해서 재귀 진입.
      }
    }
  }
  dfs(0, 0); // 0일차부터 시작!
  console.log(maxMoney); // 다 돌고 빠져나오면 최대값 출력.
}
