function solution(people, limit) {
    
    people.sort((a, b) => a - b); // 먼저 오름차순 정렬
    
    let left = 0; // 가장 가벼운 사람
    let right = people.length - 1; // 가장 무거운 사람
    let answer = 0; // 왕복 횟수
    
    // 최대 2명을 태우니까, 사용할 방법 투 포인터 방식
    while (left <= right) {
        // 가장 무거운 사람을 먼저 태우고 자리가 남으면 가장 가벼운 사람을 태우자.
        if (people[left] + people[right] <= limit) {
            right--; // 가장 먼저 탔으니 오른쪽 포인터가 왼쪽으로 감.
            left++; // 자리가 채워졌다면 왼쪽 포인터를 옮김.
        } else {
            right--; // 자리가 안 채워졌다면 왼쪽 포인터는 냅두고 오른쪽 포인터만 이동.
        }
        answer++;
    }
    return answer;
}