// 1. 서쪽에 N개의 사이트, 동쪽에 M개의 사이트, 케이스 개수 T
// 2. 한 사이트에는 최대 한 개의 다리만 연결 가능.
// 3. 다리끼리는 겹쳐지지 않음(M2가 기존 M1보다 작은 점에 지을 수 없음!)
// 4. 서쪽 다리 갯수 만큼은 연결되야 함.
// 5. 이거 사실상 조합 구하는거 아닌가? nCm 같은?
// 6. 5! / (1! * 4!) 같은 식으로!

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
  const T = Number(input[0]); // 케이스 갯수
  const output = [];
  
  for (let i = 1; i <= T; i++) { // T의 값만큼 순회.
    const [N, M] = input[i].split(' ').map(Number); // 서쪽 사이트, 동쪽 사이트 배열 삽입.
    output.push(comb(M, N)); // 출력 초과 방지용
  }
  console.log(output.join('\n')); // 결과값 한번에 출력.
}

// Math.comb가 안되니까 직접 구현해야함...
/* function comb(a, b) {
  function factorial(n) { // 팩토리얼 생성 함수
    let res = 1; // 기본값
    for (let i = 2; i <= n; i++) { // i가 1이면 어짜피 1 그대로이므로 2부터 for문 돌아가게 함.
      res = res * i; // for문 돌아갈 때마다 i값 곱해질 것.
    }
    return res; // 최종적으로 팩토리얼!
  }
  return factorial(a) / (factorial(b) * factorial(a - b)); // aCb 공식.
} */
// 아니 근데 팩토리얼을 쓰면 또 큰 숫자가 안되네?

function comb(a, b) {
// 팩토리얼을 그대로 쓰는게 아닌, aCb과 aC(a-b)가 같다는 것을 이용해서 좀 간소화해보자.
  if (b > a - b) { // b가 b - a 보다 크면
    b = a - b;     // b - a 까지만 가게끔.
  }
  let res = 1;
  for (let i = 1; i <= b; i++) { // 아까와는 달리 1인 경우도 셈이 필요.
    res = res * (a - i + 1); // 얘는 내려가면서 팩토리얼.
    res = res / i; // 이러면 자동으로 기존의 b! 이 될 것!
    // 사실상 a! 에서 이미 i-b가 나눠진 상태가 (a - i + 1)임.
  }
  return Math.round(res);
    // 큰 수의 나눗셈이나 곱셈이 반복되면, JS는 내부적으로 근사치를 저장.
    // -> 부동소수점이 존재할 수 있으므로 반올림 필요.
}

