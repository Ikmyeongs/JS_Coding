// 1. 최소 필요 피로도 존재
// 2. 하루에 한 번씩 탐험 가능 던전 여러개, 던전을 최대한 많이 (그리드 추정)
// 3. 현재 피로도 k, 던전별 최소 필요 피로도, 소모 피로도 2차원 배열 존재.
// -> 4. 아닌 것 같다. 양 끝을 해본 뒤에, 중간을 계산하는 건?
// -> 5. 잠깐, 던전 갯수가 적으니까 그냥 모두 탐색해 보는건? -> dfs로 해보자.

function solution(k, dungeons) {
    let answer = 0; // 최대 가능 수 저장용
    const visited = Array(dungeons.length).fill(false); // 방문 여부 배열
    
    function dfs(current, count) { // 전체 탐색용 dfs (재귀사용)
        answer = Math.max(answer, count); // dfs 때마다 높은 쪽을 answer에 저장. // 최댓값 갱신용!
        for (let i = 0; i < dungeons.length; i++) { // 던전 배열 순회
            const [need, cost] = dungeons[i];
            if (!visited[i] && current >= need) { // 만약에 던전 입장 가능?
                visited[i] = true; // 일단 현재 상황에서는 방문으로 지정.
                dfs(current - cost, count + 1); // 성공했으니 재귀해서 다시 한번 갈 수 있는 곳 찾아봄!
                visited[i] = false; // dfs 탈출 후, 다음 차례를 검색할 때 방문 취소를 하여 백트래킹! (1 -> 2 -> 에서 끝났다면 백트래킹해서 1 -> 3 -> 2 가 될수도 있음!)
            }
        }
    }

    dfs(k, 0);
    return answer;
}