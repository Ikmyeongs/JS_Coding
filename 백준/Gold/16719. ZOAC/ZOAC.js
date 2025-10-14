// 1. ZOAC는 A -> AC -> OAC -> ZOAC 순으로 표기됨.
// 2. 즉, 처음에는 정렬순으로 가장 첫 번째 문자열이 오고, 그 다음으로는 그 전 문자열의 오른쪽에 정렬순이 옴.
// 3. 만약 오른쪽에 올게 없으면 왼쪽에 정렬순이 오게 하고 거기서 또 오른쪽 -> 왼쪽 순으로 문자열 정렬순 따짐.
// 4. 재귀하면서 문자 완성하는 거 같은데?

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
  const str = input[0].split(''); // 문자열 배열로 바꿈.
  const output = Array(str.length).fill(''); // 출력용. 미리 입력 문자열 길이 만큼의 배열을 만듦.
  const visited = Array(str.length).fill(false); // 재귀 사용을 위해 방문 여부를 지정.
  
  function dfs(start, end) { // 문자열의 처음과 끝을 인수로 재귀함수 제작.
    if (start > end) return; // 처음에는 문제 없으나 재귀 과정에서, 오른쪽이나 왼쪽이 비면 현재 재귀 탈출 필요.
      
    let minChar = '{'; // {가 대문자 Z보다 코드값이 더 크므로, {를 기준으로 최소 갱신을 위해 사용.
    let minIdx = -1; // 배열 내 인덱스랑 안 겹치게 -1 사용.

    for (let i = start; i <= end; i++) { // start와 end로 잡은 곳을 기준으로 문자열 배열 순회 시작.
      if (!visited[i] && str[i] < minChar) { // 방문 안했고, 현재 minChar보다 크면 갱신.
        minChar = str[i]; // 가장 작은 char 갱신.
        minIdx = i; // 가장 작은 char의 인덱스 갱신.
      }
    }
    // for문 돌려서 가장 작은 문자를 찾아냈다면, 이제 출력할 차례.
    if (minIdx === -1) return; // 만약, minIdx가 그대로라면 전부 순회한 것이므로 탈주.
    visited[minIdx] = true; // 다시 출력하면 안되므로 방문 지정.
    output[minIdx] = str[minIdx]; // 가장 작은 것을 str에서 따와 그대로 삽입. (후에 재귀로 채워지는 방식!)
    console.log(output.join('')); // 배열이었으므로, 문자열화해서 출력.
      
    // 출력 후 다음 작은 녀석을 찾아야 함. 로직은 위에 이미 완성했으므로 방향만 잡아주면 됨.
    dfs(minIdx + 1, end); // 우측일 때는 minIdx의 '다음 것부터' 끝에 것까지 비교해야함.
    dfs(start, minIdx - 1); // 좌측일 때는 시작에서부터 minIdx의 '전 것까지' 비교해야함.
  }
  dfs(0, str.length - 1); // 재귀 시작.
}
