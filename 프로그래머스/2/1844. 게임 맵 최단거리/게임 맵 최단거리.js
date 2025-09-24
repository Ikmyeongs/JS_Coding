function solution(maps) {
    // 1. 검은 부분은 갈 수 없다. 즉, 루트 연결이 안 되어 있다.
    // 2. 게임 맵은 벗어날 수 없다.
    // 3. 방문 여부를 따지자. (최솟값 구하기 위해)
    // 4. 1에서 0으로 갈 수 없다.
    const myX = 0; // 내 위치 먼저 정의
    const myY = 0;
    const myPlace = []; // 내 위치를 이동 시킬 큐 생성
    const visited = [];
    for (let i = 0; i < maps.length; i++) {
        visited.push(new Array(maps[0].length).fill(false)); // 2차원 배열 생성법
    } // 세로 길이(maps[0].length)와 가로 길이(i)만큼 false 배열 생성
    
    myPlace.push([myX, myY, 1]); // 초기 위치 선정, 첫 칸은 거리 1 취급.
    const direction = [
            [-1, 0],  // 상단 이동
            [1, 0],   // 하단 이동
            [0, -1],  // 좌측 이동
            [0, 1],   // 우측 이동
          ];
    
    visited[0][0] = true; // 첫 방문 
    while (myPlace.length > 0) {
        const [myX, myY, count] = myPlace.shift();
        
        if (myX === maps.length - 1 && myY === maps[0].length - 1) {
            return count; // 도착 지점에 도달한 경우, 지금까지의 count 반환
        } // shift를 하고 나서 검수해야 불필요한 for문 안 돌림.
        
        for (const [dx, dy] of direction) { // 상하 좌우 이동할 변수 생성.
            const nextX = myX + dx; // 다음 X 이동 위치
            const nextY = myY + dy; // 다음 Y 이동 위치
            
            if(nextX >= 0 && nextX < maps.length && // nextX는 maps 범위 내에 있어야함.
               nextY >= 0 && nextY < maps[0].length && // nextY는 maps 범위 내에 있어야함.
               maps[nextX][nextY] === 1 && // 다음 위치는 1이어야만 이동 가능.
               !visited[nextX][nextY]) { // 게다가 방문하지 않았다면,
                visited[nextX][nextY] = true; // 방문 위치를 true로 지정. (이 시점에서 이동이 되는 곳은 전부 true가 됨.)
                myPlace.push([nextX, nextY, count + 1]); // 큐를 다시 돌리기 위해, 큐에 push하고, count 값 증가.
                // 큐의 경우는 FIFO 방식이기 때문에 어떻게 검색 순서가 달라질 수는 있어도, 결국 최초로 shift한 것이 도달하는 부분이 최소값을 의미.
            }
        }
    }
    
    return -1; // 만약 while문 돌렸는데 못 찾았다. 그러면 -1 반환.
}