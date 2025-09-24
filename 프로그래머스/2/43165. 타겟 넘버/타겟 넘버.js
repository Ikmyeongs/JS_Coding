function solution(numbers, target) {
    // 1. 더하기 빼기만 사용해서 만듦.
    // 2. 나는 재귀함수를 사용할 것(dfs)
    let count = 0; // return할 초기값 지정.
    
    function dfs(idx, sum) { // 내부에서 count를 계산할 함수 만듦.
        if(idx === numbers.length) { // dfs 멈춤 분기.
            if(sum === target) { // idx가 끝이고 sum이 target이다? 그러면 성공.
                count++; // 가능 수 증가.
            }
            return; // 그냥 dfs 끝이기만 하면 function만 벗어남.
        }
        // 이제 재귀함수를 사용해보자.
        // 조건에서 +, -만으로 분기를 나누기 때문에 재귀함수 내에서 두 가지 가지수로 뻗어나갈 것.
        dfs(idx + 1, sum + numbers[idx]); // idx가 다음으로 넘어갔을 때 sum을 현재 값에 + 하는 방식.
        dfs(idx + 1, sum - numbers[idx]); // idx가 다음으로 넘어갔을 때 sum을 현재 값에 - 하는 방식.
    }
    // 둘 다 사용되었으니, 저기서 target에 걸리는 분기는 count++ 될 것.
    dfs(0, 0); // 처음 항목 부터, sum은 초기값이 0. 이렇게 시작하면 위에서 재귀를 돌렸을 때 idx가 numbers.length 분기를 볼 수 있겠지.
    
    return count;
}