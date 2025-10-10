// 1. 네트워크는 서로 연결되어 있다. (양방향)
// 2. 기준은 1번 컴퓨터의 바이러스를 기준으로 한다.
// 3. 양방향을 가진다? visited를 사용한 DFS가 좋겠는데?
// 4. 구해야 되는건 숙주를 제외한 감염 컴퓨터 수.

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
  const n = Number(input[0]); // 첫 번째 줄은 컴퓨터 수
  const m = Number(input[1]); // 두 번째 줄을 간선 수
  const edges = Array.from({ length: n + 1 }, () => []); // 컴퓨터 마다 가진 간선의 배열의 토대를 만듦.
  for (let i = 2; i <= (m + 1); i++) { // 간선 수 만큼 배열 순회 (i를 입력으로 쓰기 위해 간선에 + 1함.)
    const [a, b] = input[i].split(' ').map(Number); // 입력값 a, b 받아서
    edges[a].push(b); // 간선 연결 경로에 저장.
    edges[b].push(a); // 조건은 양방향이므로, 양쪽 저장.
  }
  
  const visited = Array.from({ length: n + 1 }, () => false); // 방문 여부 false로 채움.
  
  function dfs(computer) {
    visited[computer] = true; // 방문 표시.
    
    for(const neighbor of edges[computer]) { // 컴퓨터 개수 만큼 순회.
      if (!visited[neighbor]) { // 방문 안했을 경우
        dfs(neighbor); // 방문 시작.
      }
    }
  }
  dfs(1); // 시작 위치는 1번 컴퓨터. 어짜피 전부 순회하기 때문.
  console.log((visited.filter(virus => virus === true).length) - 1); // 바이러스 감염된 컴퓨터만 찾아서 1번 컴퓨터 빼기.
}