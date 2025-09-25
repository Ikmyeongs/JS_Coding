// 1. 모든 요청이 배정될 수 있을 때에는 매우 큰 값 그대로 리턴
// 2. 모든 요청이 배정될 수 없을 때에는 특정값 상한액 잡고 이상은 상한액으로 리턴
// 3. 찾아야 되는 것은 상한액 (정렬 후, 이진 탐색)

const rl = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout,
});

const input = [];

rl.on('line', (line) => {
  input.push(line.trim());
}).on('close', () => {

  const N = parseInt(input[0]); // 지방 수 변수 선언.
  const cities = input[1].split(' ').map(Number); // 예산 요청 값 배열
  const M = parseInt(input[2]); // 총 예산.
  
  function solution(n, cities, m) {
    let cut = 0; // 예산컷 잡기.
    let all = 0; // 이거는 총 예산액 넣으려는 변수
    cities.sort((a, b) => a - b); // 가장 먼저 sort.
      
    for (let city of cities) { // 각 지방의 예산을 순회
      all += city; // 예산 합쳐서 all에 저장
    } 
      
    if (all <= m) { // 만약 이 때 all이 더 작으면 예산 배정액에 통과되므로
      cut = cities[n-1]; // 예산컷을 가장 높은 예산에 잡아도 상관 없음.
      return cut; // 반환으로 조건 1 부합.
    } else if (all > m) { // 이렇게 되면 중간값을 구해야함.
      let left = 0;
      let right = cities[n-1];
      
      while (left <= right) { // 이진 탐색 ON
        let mid = Math.floor((left + right) / 2); // 이진 탐색이니 일단 중간값을 예산액으로 지정.
        let sum = cities.map(c => Math.min(c, mid)).reduce((a, b) => a + b);
        // 기존 적힌 예산과 mid를 비교해, 더 크면 적힌 예산을 Math.min을 통해 mid로 바뀐 배열로 만드는 작업.
        // 그리고 reduce(총합 구하기)해가지고 배열을 합으로 바꿈. 빈 배열이 올 수도 있으므로 초기값 지정 필요.
        if (sum <= m) { // 만약 sum이 더 작다?
          left = mid + 1; // left 값을 mid 보다 올림.
          cut = mid; // 일단, cut에다가 mid를 저장. mid는 위의 while문으로 다시 바뀔 것.
        } else {
          right = mid - 1; // 예산 초과, mid값 줄여야 함.
        }
      }
    }
    return cut; // 이제야 cut을 반환 가능.
  }
  
  console.log(solution(N, cities, M));
});