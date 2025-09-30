// 1. 회의실 하나, 회의 N개에 대하여 최대 회의 가능 수 구하기.
// 2. 입력은 회의 갯수 N, 둘째 줄부터 N+1 줄까지 회의 정보. 간격 두기.
// 3. 시간순으로 정렬해서 비교하는 게 좋을 것 같음, 끝나는 시간도 포함하면
// -> 2차원 배열로 만들어야겠지.
// 4. 회의 시간 순서를 먼저 시작순으로 한다면, 배열 순회를 굴렸을 때 0 6, 1 2, 3 5 같은 안좋은 결과가 나올 수도 있음.
// -> 차라리 종료순으로 하고, 같은 것에서 시작순으로 정렬하자.

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
  const N = Number(input[0]); // 첫 입력
  const meetings = []; // 회의 시간 배열 선언
  
  for (let i = 1; i <= N; i++) { // N의 값만큼 순회.
    const [start, end] = input[i].split(' ').map(Number); // ' '로 구분 후 숫자 처리.
    meetings.push([start, end]); // 회의 시간 배열 삽입 -> 2차원 배열 생성됨
  }
    
  meetings.sort((a, b) => { // 회의 시간 정렬, 종료 시간 기준으로 하는 것이 4번의 주석에 따라 좋음.
    if (a[1] === b[1]) { // 종료 시간이 같다면
      return a[0] - b[0]; // 시작 시간 기준 오름차순
    }
    return a[1] - b[1]; // 종료 시간 기준 오름차순
  });
  
  let nextStart = 0; // for 문 돌리기 위한 변수. 다음 회의 시작 가능 시간이라는 의미로 선언했음.
  let count = 0; // 회의 수 저장 변수.
  
  // 최대 회의 수 구하기 시작
  for (let [start, end] of meetings) { // 정렬도 됐으니 이제 배열 순회해서 구하는 일만 남음.
    if (nextStart <= start) { // 해당 회의의 시작 시간이 다음 회의 시작 가능 시간보다 크거나 같다?
      nextStart = end; // 다음 회의가 들어올 수 있게 됨. 회의 시작했으니, 해당 회의의 종료 때까지는 회의 잡을 수 없음.
      count++; // 회의 수 증가.
    } // 이제 for 문으로 회의가 끝나는 시간 이후에 가능한 것들만 if문에 부합하여 count++ 해줄 것.
  } 
  console.log(count);
}
                