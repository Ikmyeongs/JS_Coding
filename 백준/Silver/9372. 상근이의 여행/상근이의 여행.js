// 1. 연결 그래프를 이룬다. (서로가 쌍이다, 그래프니까 DFS를 써볼까?)
// 2. 입력값은 테스트 케이스의 수부터 시작해서 계속 줄 수가 늘어난다. (배열 인덱스 계속 사용하자.)
// 3. T는 케이스 수, N은 국가 수, M은 왕복 비행기 수

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
  let idx = 0;
  const T = Number(input[idx]);
  idx++; // 첫 입력 처리

  for (let t = 0; t < T; t++) { // T의 값만큼 순회.
    const [N, M] = input[idx].split(' ').map(Number); // ' '로 구분 후 숫자 처리.
    idx++;
      
    const edge = Array.from({ length: N + 1 }, () => []); // 처음에 국가간 연결을 국가 수 만큼의 빈 배열로 지정.
    for (let i = 0; i < M; i++) { // 이번엔 국가간 연결 정의를 양방향으로 하기 위한 for문
      const [a, b] = input[idx].split(' ').map(Number); // 여기도 입력줄을 계속 늘어나므로 idx를 사용
      idx++;
      edge[a].push(b); 
      edge[b].push(a); // 양방향으로 만듦.
    }
    // 이제 방문을 시작하자.
    const visited = Array.from({ length: N+1 }, () => false); // 모든 배열 내부 false 선언 하기. 단, 도시 1부터라는 걸 알리기 위해 N+1
    let count = 0; // 초기 방문 횟수
      
    function dfs(city) {
      visited[city] = true; // 첫 방문이자 시작점. 방문 true로. 
      for (const neighbor of edge[city]) { // 지금 city 기준으로 간선을 살펴보기.
        if (!visited[neighbor]) { // 여기서 다른 국가로 갈 수 있는데 이웃 국가 방문 안했네? 방문하자.
          count++; // 비행기 탑승 숫자 늘리고,
          dfs(neighbor); // 이번엔 이웃 국가를 가보자.
        } 
      }
    }
    dfs(1); // 시작 위치는 1번 국가로 잡음. 어짜피 결국 모두 순회함.
      
    console.log(count); // 비행기 탄 횟수 반환.
  }
}