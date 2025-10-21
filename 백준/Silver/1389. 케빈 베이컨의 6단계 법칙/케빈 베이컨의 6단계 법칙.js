// 1. 플로이드 워셜인가? 관계니까.

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
  const [N, M] = input[0].split(' ').map(Number); // 유저 수, 관계 수

  // 아직 관계 모르니까 사이를 infinity로.
  const dist = Array.from({ length: N + 1 }, () => Array(N + 1).fill(Infinity));

  // 자기 자신이니까 관계는 0으로.
  for (let i = 1; i <= N; i++) {
    dist[i][i] = 0;
  }

  // 친구 관계 입력받고, 이미 아니까 거리는 1로 설정.
  for (let i = 1; i <= M; i++) {
    const [a, b] = input[i].split(' ').map(Number);
    dist[a][b] = 1;
    dist[b][a] = 1;
  }

  // 플로이드-워셜 알고리즘 // 시작 중간 끝에서 중간이 관계의 중심.
  for (let k = 1; k <= N; k++) {
    for (let i = 1; i <= N; i++) {
      for (let j = 1; j <= N; j++) {
        if (dist[i][j] > dist[i][k] + dist[k][j]) {
          dist[i][j] = dist[i][k] + dist[k][j];
        }
      }
    }
  }

  // 이제 구해보자.
  let minSum = Infinity;
  let answer = 0;

  for (let i = 1; i <= N; i++) { // 최솟값 구하자!
    const total = dist[i].slice(1).reduce((a, b) => a + b, 0);
    if (total < minSum) {
      minSum = total;
      answer = i;
    }
  }
  // 다돌면 최소인 친구가 출력될 것
  console.log(answer);
}