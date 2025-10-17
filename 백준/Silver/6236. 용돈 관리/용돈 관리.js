// 1. 일수 N, 통장에서 빼는 수 M 첫 입력, 다음 입력은 각 날마다 사용한 금액.
// 2. M번을 맞추면서 최소인 뺄 금액 K가 필요.
// 3. count++ 하면서 K를 맞춰야 하나?
// 4. 잠깐, 모자라게 되면 남은 금액은 통장에 집어넣고 다시 K원을 인출이니까 일단 적어도 쓰게될 금액 중 가장 큰거에 맞춰야겠네?
// 5. 감잡았다. 최솟값(배열의 최대값)과 최댓값(합계)에 K를 잡고 mid값을 이진 탐색하자.

const rl =  require('readline').createInterface({
  input: process.stdin,
  output: process.stdout,
});

const input = [];

rl.on('line', (line) => {
  input.push(line.trim());
}).on('close', () => {
  solution(input);
});

function solution(input) {
  const [N, M] = input[0].split(' ').map(Number); // 일수, 뺄 횟수 입력받음
  const cost = [];
  for (let i = 1; i <= N; i++) { // N의 값만큼 입력 받기.
    cost.push(Number(input[i]));
  }
  const limit = M; // 한계값
  let left = Math.max(...cost);  // cost 내에서 가장 큰 값이어야 안 빠지고 사용 가능.
  let right = cost.reduce((a, b) => a + b, 0); // reduce 메소드로 배열 전체 합계 구하기. 초기값은 0으로 줌.
  let answer = 0; // 정답 값 지정.
    
  // 구하고자 하는 answer 값은 left와 right 사이에 있을 것. 한 번 돌려서 찾아보자.
  while (left <= right) { // 이진 탐색 돌리기 위해 반복
    const mid = Math.floor((left + right) / 2); // 왼쪽 오른쪽의 중앙값.
    let count = 1; // 초기 인출 횟수.
    let myMoney = mid; // 사용할 값 myMoney를 mid로 초기에 지정. for문으로 값 조정될 것.
    
    for (let i = 0; i < N; i++) {
      if (myMoney < cost[i]) { // 만약 초기에 인출한 myMoney가 쓸 값 보다 적으면 인출해야함.
        count++; // 인출 횟수 증가
        myMoney = mid; // 다시 mid로 잡아놓은 값 만큼 인출! (남은 돈은 반환됨!)
      }
      myMoney -= cost[i] // 안 모자르면 그냥 myMoney에서 그대로 사용!
    }
      
    // 이제 count값을 비교할 차례.
    if (count <= M) { // 인출 횟수 한도보다 작으면 일단 만족 상태니까, mid를 내려도 될 것.
      answer = mid; // 일단 내리기 전에 지금 mid값을 answer에 저장해둚.
      right = mid - 1; // mid일때 만족했으니 mid에서 1 내리고 더 만족하는 값이 있는지 다시 이진 탐색 시작.
      // 위 과정을 while로 반복하다보면 count가 M과 같으면서 금액은 더 이상 변경할 수 없는 지점이 존재할 것.
    } else { // 이 경우엔 인출 횟수 초과 이므로, 횟수에 맞게 하기 위해 최솟값 조정 필요.
      // answer 또한 초과해서 만족하지 않음.
      left = mid + 1; // mid일때 초과했으니 mid보다 1 크게 잡아주고 다시 이진 탐색 시작.
    }
  }
  console.log(answer); // 결론적으로 구해진 answer를 출력하면 됨.
}