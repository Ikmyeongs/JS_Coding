// 1. DFS 탐색 결과, BFS 탐색 결과 알고리즘 만들기.
// 2. DFS는 visited가 다 돌아가면 종료, BFS는 큐가 비면 종료.
// 3. 정점이 여러 개인 경우에는 정점 번호가 작은 것을 먼저 방문
// 4. 입력은 정점 개수 N, 간선 개수 M, 시작 정점 번호 V

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
  const [N, M, V] = input[0].split(' ').map(Number); // 정점 수, 간선 수, 시작 정점이 첫 줄
  const edges = Array.from({ length: N + 1 }, () => []); // 정점 마다 가진 간선의 배열 만듦.
  for (let i = 1; i <= M; i++) { // 간선 수 만큼 배열 순회
    const [a, b] = input[i].split(' ').map(Number); // 입력값 a, b 받아서
    edges[a].push(b); // 간선 연결 경로에 저장.
    edges[b].push(a); // 참고로 조건은 양방향 이었음.
  }
  edges.forEach(edge => edge.sort((a, b) => a - b)); // 정점 번호가 작은 것을 먼저 방문하기 위해 정렬.
  
  const dfsVisited = Array.from({ length: N + 1 }, () => false); // 모든 배열 내부 false 선언 하기. 단, 도시 1부터라는 걸 알리기 위해 N+1
  let dfsOutput = []; // 배열 생성.
  
  // dfs 만들기
  function dfs(dots) {
    dfsVisited[dots] = true; // 방문점 true
    dfsOutput.push(dots); // 방문점 기록
      
    for(const neighbor of edges[dots]) { // 모든 간선 방문할 때까지 시행.
      if (!dfsVisited[neighbor]) { // 방문점에서 간선 방문 안했다?
        dfs(neighbor); // 직접 만나러 갑니다.
      }
    }
  }
  dfs(V); // 시작점 조건 V
  console.log(dfsOutput.join(' ')); // 기존 배열 출력을 , 에서 스페이스로 바꾸기 위해 사용.
    
  const bfsVisited = Array.from({ length: N + 1 }, () => false); // 모든 배열 내부 false 선언 하기. 단, 도시 1부터라는 걸 알리기 위해 N+1
  let bfsOutput = [];
  
  // bfs 만들기
  function bfs(dots) {
    const queue = []; // 큐 생성
    queue.push(dots); // 큐에 시작값 넣기.
    bfsVisited[dots] = true; // 시작 지점이므로 방문 처리.
      
    while (queue.length) { // 큐에 값이 있을 때까지 돌아감.
      const current = queue.shift(); // 큐에서 꺼내기 전에 현재 정점 저장해서 사용해야 함.
      bfsOutput.push(current); // 출력 결과에 큐 값이었던 것 저장.
      
      for (const neighbor of edges[current]) { // 지금부터 간선 찾기 시작.
        if (!bfsVisited[neighbor]) { // 간선을 찾았는데 방문 안 됐다고?
          bfsVisited[neighbor] = true; // 지금 만나러 갑니다.
          queue.push(neighbor); // 꺼내진 neighbor 안의 값들은 큐에 넣어짐. -> while로 다시 순회
        } // 다르게 말하면 방문 했으면 큐에 안넣음!
      }
    }
  }
  bfs(V);
  console.log(bfsOutput.join(' '));
    
}