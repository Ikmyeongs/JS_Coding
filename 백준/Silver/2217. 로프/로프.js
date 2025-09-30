// 1. 정수 N (input 하나)
// 2. N개의 줄 (n만큼 for문)
// 3. 로프 k개, 중량 w 일때 각각의 로프에는 w/k 만큼의 중량.
// 4. 모든 로프를 사용할 필요는 없고, 구해야 하는 것은 최대 중량.
// -> 그렇다면 4개의 로프가 주어졌지만 2개를 써서도 최대가 나올 수도 있다는 것. 최대값을 갱신해가면서 구해보자.

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
  const N = Number(input[0]);
  const ropes = [];
  for (let i = 1; i <= N; i++) { // N의 값만큼 입력 받기.
     ropes.push(Number(input[i]));
  }
  ropes.sort((a, b) => b - a); // 갯수를 늘려가면서 최대 계산을 하기 위해, 내림차순 정렬
  // 내림차순 정렬 이유? -> 강한 순으로 정렬을 해야만 같은 개수를 계산하더라도 더 큰 하중을 구할 수 있음.
  
  let maxWeight = 0; // 최대 무게 저장할 변수 만듦.
  
  for (let i = 0; i < N; i++) { // 배열을 순회하면서 최대값 계산.
    const currentMax = ropes[i] * (i + 1); // 현재 최댓값을 지정해줌.
    // 최대 무게는 사용할 로프 중 가장 작은 로프의 하중에 따라감. (3번의 w/k 공식)
    if (currentMax > maxWeight) { // 만약에 지금 사용하는 로프로 구할 수 있는 최대 무게가 여태 구한 것보다 높다?
      maxWeight = currentMax; // 교체.
    }
  }
    
  console.log(maxWeight); // 구해진 최대 무게 반환.
}