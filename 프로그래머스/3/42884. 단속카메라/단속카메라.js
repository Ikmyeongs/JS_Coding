function solution(routes) {
    // 진입 지점보다 진출 지점에서 겹칠 확률이 높으므로, 진출 지점 기준 정렬
    routes.sort((a, b) => a[1] - b[1]);

    let answer = 0; // 사용된 카메라 수
    let cameraPlace = -30000; // -30,000 부터 시작하므로. 초기값을 -30000 지정.
    
    for(let [start, end] of routes) { // for of문으로 routes 순회
        if(cameraPlace < start) { // start 시점이 바뀌었을 때 cameraPlace 안에 없으면, 추가해야함.
            cameraPlace = end; // end 지점에 놓으면 다른 지점의 start가 이 차량의 start~end 사이에 있을 수 있음. (그리디 전략)
            answer++; // 카메라 갯수 증가
        }
    }
    return answer;
    
}