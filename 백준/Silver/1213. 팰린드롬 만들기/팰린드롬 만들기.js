// 1. 중앙을 기준으로 서로 대칭인 문자 만들기.
// 2. 만약에 대칭이 안된다면 I'm Sorry Hansoo를 출력.
// 3. 입력은 알파뱃 대문자로만 되어 있음. (따로 조건 줄 필요 X)

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
  const str = input[0].toString().split(''); // 문자열 배열로 바꿈.
  const charCount = new Map(); // 갯수 탐색용 맵 객체 생성
  
  for (const char of str) {
    if (charCount.has(char)) {
      charCount.set(char, charCount.get(char) + 1); // 이미 있으면 기본값에 +1 해서 저장.
    } else {
      charCount.set(char, 1); // 없었는데 새로 만났다면 1 지정.
    }
  }
    
  let notTwin = 0; // 쌍 아닌 값 갯수 비교. 쌍이 1개까지는 중간에 올 수 있음. 그 이상 안됨.
  let notTwinChar = '';
  
  for (const [char, count] of charCount) { // 맵 객체에 for of를 써서 홀수 갯수 판별 시작.
    if (count % 2 === 1) { // 나머지가 1이라면, 홀수라는 뜻.
      notTwin++; // 홀수 갯수 저장,
      notTwinChar = char; // 홀수인 문자 저장.
    }
  }
  
  if (notTwin > 1) {
    console.log("I'm Sorry Hansoo"); // 홀수 갯수가 1이 넘으면 펠린드롬을 만들 수 없음.
    return; // 리턴 분기 1(펠린드롬이 안될 때)
  }
  
  // 이제 우리가 만들어야 되는건 대칭 문자열.
  // 생각을 바꿔서, 왼쪽을 거꾸로 하면 오른쪽이 되니까 reverse를 쓰면 편하겠네? 적용해보자.
  let left = ''; // 왼쪽 문자열 선언
  let center = ''; // 중앙값 문자열 선언
  const sortedChars = Array.from(charCount.keys()).sort(); // 이번엔 키값을 기준으로 정렬.
  
  for (const char of sortedChars) { // 문자열 나열 시작.
    // 홀수 판별 먼저.
    if (charCount.get(char) % 2 === 1) { // 홀수 찾았다.
      center = char; // center값 완성!
    }
    
    // 이제 문자열쌍마다 i(문자열쌍에 들어간 동일문자 갯수 / 2) 만큼 왼쪽에 삽입!
    for (let i = 0; i < Math.floor(charCount.get(char) / 2); i++) { // 3 이상인 홀수가 쓰였을 수도 있음. 
      // 그 경우에는 정수가 아니므로 Math.floor 해줘야함.
      left += char; // for문과 바깥 for문이 작동하면서 A B 순으로 문자열 생성할 것.
    }
  }
  // 이제 나머지 절반인 오른쪽을 만들 차례
  let right = left.split('').reverse().join(''); // 번거롭게도, left 문자열 자체를 그대로
  // reverse할 수는 없어서, 배열 -> reverse -> 문자열 과정을 거쳐야함...
  console.log(left + center + right); // 문자열 다 합치면 완성! 
}