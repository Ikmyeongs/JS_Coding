// 1. 첫째 줄에 책의 개수 N, 그 다음 줄부터 책 이름 N개.
// 2. 가장 많이 팔린 책 개수 구하기. -> 책 이름 별로 분류하고, 책 마다 수를 입력하면 되지 않을까? -> map!
// 3. 최댓값이 같으면 사전 순 정렬이 제일 먼저인 것. -> 정규화?

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
  const N = Number(input[0]); // 첫 줄은 책의 개수
  const bookName = []; // 책 이름 저장 배열 선언
  for (let i = 1; i <= N; i++) { // 책 입력 순회
    bookName.push(input[i]); // 저장
  }
  
  const bookCount = new Map(); // 키-밸류를 써서 저장해보자.
  for (let book of bookName) { // 책 이름 순회 시작
    if (!bookCount.has(book)) { // 만약에 현재 book이 bookCount 맵에 없다면, 
      bookCount.set(book, 1); // 첫 등장이므로 그 책 이름과 팔린 수(처음 팔렸으니 1)를 키-밸류로 저장
    } else { // 만약 이미 책 이름이 키로 등록되어 있다?
      const currentCount = bookCount.get(book); // 현재 키의 밸류를 가져오고 현재 팔린 수 변수에 저장.
      bookCount.set(book, currentCount + 1); // 팔린 갯수 갱신!
    }
  }
  // 여기서 중요한 점은, 값이 같으면 어느게 먼저 될지 모름. -> 정렬 필요
  const sortedBook = [...bookCount.entries()].sort((a, b) => {
    // 키-밸류 쌍의 배열로 바꾼 후, 전개 연산자 써서 전체 나열하고, []로 배열로 감싼 후 정렬.
    if (b[1] === a[1]) { // 하지만, 조건으로 판매량이 같을 경우
      return a[0].localeCompare(b[0]); // 정렬을 사전 순으로 하도록 함.
    }                
    return b[1] - a[1]; // if에 안걸리면 그냥 내림차순 정렬.
  });

  console.log(sortedBook[0][0]); // 이렇게 하면 맨 처음 배열 요소가 답!
    
}