// 1. 최소 힙을 이용한 연산 지원
// 2. 첫째 줄 N은 연산 횟수, 그 다음 줄부터 N+1까지 정수 x 입력.
// 3. 0이 아니면 배열값 추가, 0이면 배열에서 가장 작은 값 출력, 배열에서 제거 연산
// 4. 0 갯수만큼 출력 시행, 배열이 비어있을 경우 0 출력.

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

/* function solution(input) {
  const N = Number(input[0]);
  const x = []; // 저장할 배열
  for (let i = 1; i <= N; i++) { // N의 값만큼 입력 받기.
    if (input[i] === 0 && x.length === 0) { // 입력값이 0이고 배열이 비어있으면
      console.log(0); // 0 출력
    } else if (input[i] === 0 && x.length) {
      console.log(x[0]); // 가장 작은 값 출력
    } else {
      x.push(Number(input[i])); // 0 이상이면 배열에 입력값 저장.
      x.sort((a, b) => a - b); // 그리고 오름차순 정렬.
    }
  }
} */

// 그러나 문제는 저렇게 하면 데이터가 방대해지면 sort 때문에 시간 초과가 날 수 있음.
// heap을 결국 구현해야하네...
const heap = []; // heap 배열 선언

function heapInsert(value) { // 힙에 삽입할 때 실행할 함수 선언.
  heap.push(value); // 먼저 삽입.
  let currentIdx = heap.length - 1; // 삽입된 항목의 현재 인덱스를 잡아주고,
  let parentIdx = Math.floor((currentIdx - 1) / 2); // 현재 인덱스의 부모 인덱스는 이진 트리 상으로 이렇게 됨.
  // 공식이라 생각하면 편함!

  while (currentIdx > 0 && heap[parentIdx] > heap[currentIdx]) { // heap 값 비교 조건을 만듦.
    // 처음 들어간 거면 현재 인덱스가 0이기 때문에 값 비교를 할 필요가 없음.
    // 그 다음으로, 최소 힙이므로, 자식이 부모보다 커야함. 이 두개를 만족해야 비교 시작.
    [heap[parentIdx], heap[currentIdx]] = [heap[currentIdx], heap[parentIdx]];
    // 위는 자바스크립트의 비구조화 할당으로 덮어쓰기 되므로 스왑이 가능.
    // 비구조화 할당으로 두 값을 임시 저장소(예시로 우리가 쓰는 temp)에 넣어둔 후, 서로의 값을 서로에게 넣음.
    currentIdx = parentIdx; // 스왑이 되었으니, 이번엔 부모 인덱스를 현재 인덱스로 주고.
    parentIdx = Math.floor((currentIdx - 1) / 2); // 부모와 조부모를 비교하면 됨.
  } // 위 Math.floor를 통해 currentIdx가 0이 될 때까지 비교 시작.
} // 위 과정을 통해 맨 위에 최소값을 위치시킴. (단, 같은 층내 비교는 안함.)

function heapExtractMin() {
  if (heap.length === 0) return 0; // 조건의 길이가 0이면 0 출력하게 하기 위함.
  if (heap.length === 1) return heap.pop(); // 길이가 1이면 그냥 최상단 꺼내면 됨!

  const min = heap[0]; // 최소 힙에서 0번 인덱스가 최소값이므로 min에 저장.
  heap[0] = heap.pop(); // 이진 트리 구조를 유지시키기 위해, 마지막 배열 요소를 최상단에 치환.
  // 이때 부터 다시 비교를 시작해야함.

  let currentIdx = 0; // heap.pop한 것을 heap[0]에 넣었으므로, heap[0]을 비교하기 위해 변수 선언.

  while (true) {
    let leftIdx = 2 * currentIdx + 1; // 트리 상에서 왼쪽 값 비교를 위해 인덱스 선언
    let rightIdx = 2 * currentIdx + 2; // 트리 상에서 오른쪽 값 비교를 위해 인덱스 선언
    let minIdx = currentIdx; // 비교 인덱스 잡아줌. (이 경우 minIdx가 부모 인덱스, left, right가 자식 인덱스)

    if (leftIdx < heap.length && heap[leftIdx] < heap[minIdx]) { 
      // 좌측 인덱스가 힙 길이보다 크면 힙을 벗어난 거라 비교할 수가 없음.
      // 거기에 좌측 자식 비교하다가, 부모가 더 클 경우,
      minIdx = leftIdx; // 그 때는 자식을 부모와 위치를 바꿔줄 준비를 해야함.
    }
    if (rightIdx < heap.length && heap[rightIdx] < heap[minIdx]) {
      // 우측 인덱스가 힙 길이보다 크면 힙을 벗어난 거라 비교할 수가 없음.
      // 거기에 우측 자식 비교하다가, 부모가 더 클 경우,
      minIdx = rightIdx; // 그 때는 자식을 부모와 위치를 바꿔줄 준비를 해야함.
    }
    if (minIdx === currentIdx) break; // 비교하려다가 인덱스가 같으면 while 탈출
    // 이 경우, 양쪽 자식이 부모보다 크므로, minIdx가 바뀌지 않았음. 비교 필요없다 생각하고 그냥 탈출함.
    
    // break하지 않았을 경우, 더 큰 값이 부모에 있으므로 if에 걸린 자식과 스왑시킴.
    [heap[currentIdx], heap[minIdx]] = [heap[minIdx], heap[currentIdx]];
    currentIdx = minIdx; // 이번엔 자식을 부모로 두고 탈출할 때까지 다시 비교 시작.
  }
    
  return min; // 결국 정렬이 다 끝나고 나서야 min을 반환할 수 있음! (최소 힙 만족 상태에서 반환)
  // 여기서 console.log 하면 시간 초과가 남. 따로 또 변수를 빼둬야 할 거 같음.
}

// 사실상 위 과정을 거치면서 양쪽 함수가 계속 정렬을 해줌.
function solution(input) {
  const N = Number(input[0]);
  const answer = []; // 출력 전용 빈 배열 생성
  for (let i = 1; i <= N; i++) {
    const x = Number(input[i]);
    if (x === 0) { // 입력값 0일 때 최소값 출력 혹은 0 출력을 위해 heapExtractMin을 실행.
      answer.push(heapExtractMin()); // 값은 answer에 넣어 놓음
    } else {
      heapInsert(x); // 0 아니면 그대로 heap에 삽입 후 정렬.
    }
  }
  console.log(answer.join("\n")); // 저장한 것을 줄바꿈 붙여서 한꺼번에 출력.
}