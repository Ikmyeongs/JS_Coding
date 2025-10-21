// 1. 첫째 줄에 킹의 위치, 돌의 위치, 움직이는 횟수 N, 둘째 줄부터 킹의 이동
// 2. 킹이 이동하는 곳에 돌이 있을 경우, 돌을 킹이 이동한 방향으로 똑같이 이동 시킴.
// 3. 킹이나 돌이 체스판 밖으로 이동할 경우, 그 이동은 무효로 취급.
// 4. 대각선 이동도 가능. 즉 8방향 이동. 
// 5. 출력은 킹의 위치, 그 다음 줄에 돌의 위치
// 6. 구현 자체는 bfs로 queue에 조건문 줘서 하는건가?

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
  const [king, stone, nCount] = input[0].split(' '); // 입력받기
  let N = parseInt(nCount);
  const moves = input.slice(1, 1 + N); // input[1]부터 input[N]까지 입력 받음.
    
  const directions = { // 8방향 구현
    L: [-1, 0],
    R: [1, 0],
    T: [0, 1],
    B: [0, -1],
    LT: [-1, 1],
    LB: [-1, -1],
    RT: [1, 1],
    RB: [1, -1],
  };

  // A1을 [0, 0] 형태의 좌표 배열로 반환, 문자열 인덱싱.
  const toNum = (chess) => [chess.charCodeAt(0) - 65, parseInt(chess[1]) - 1]; // A의 유니코드 값이 65이므로 0으로 만듦.
  const toChess = ([x, y]) => String.fromCharCode(x + 65) + (y + 1);       // 역으로 체스좌표로 변환.
    
  let kingPos = toNum(king); // 입력 받은 문자열 위치를 2차원 배열로 변환.
  let stonePos = toNum(stone);

  for (let move of moves) {
    const [dx, dy] = directions[move]; // move(LT, LB 등)을 받아서
    const nextX = kingPos[0] + dx; // nextX는 킹의 다음 x 좌표 반영
    const nextY = kingPos[1] + dy; // nextY는 킹의 다음 y 좌표 반영
    
    if (isOut(nextX, nextY)) continue; // 바깥으로 나가면 continue로 이번 move는 건너 뜀.
    // 나가지 않았을 경우 돌 위치 계산.
      
    if (nextX === stonePos[0] && nextY === stonePos[1]) { // 만약 다음 킹 위치가 돌 위치랑 같아진다면
      const stoneX = stonePos[0] + dx; // 돌도 같이 이동 시켜버림.
      const stoneY = stonePos[1] + dy;

      if (isOut(stoneX, stoneY)) continue; // 근데 만약 돌이 바깥으로 나가면 continue로 이번 move는 건너 뜀.

      stonePos = [stoneX, stoneY]; // 안 나갔을 경우 돌 이동 반영.
    }

    kingPos = [nextX, nextY]; // 전제 조건을 완수했으니 그제서야 킹 위치 반영 가능.
  }

  // for문 탈출 후, 배열을 다시 문자열로 변환해서 콘솔 찍음.
  console.log(toChess(kingPos));
  console.log(toChess(stonePos));
}

function isOut(x, y) { // 범위 지정 함수를 미리 만듦.
  return x < 0 || x > 7 || y < 0 || y > 7; // 체스판 바깥일때만 isOut 여부 따짐.
}