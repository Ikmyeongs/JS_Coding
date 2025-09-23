function solution(n, lost, reserve) {
    // 적용을 위해선 정렬 우선
    lost.sort((a, b) => a - b);
    reserve.sort((a, b) => a - b);
    
    // 여벌 체육복을 가져온 학생이 체육복을 도난당했을 수도 있음, 각 lost와 reserve에서 제외시키기. (자기가 입어야하기 때문)
    const lostFiltered = lost.filter(l => !reserve.includes(l));
    const reserveFiltered = reserve.filter(r => !lost.includes(r));
    
    // 앞 친구를 우선으로 빌려주게 적용.
    for(let r of reserveFiltered) {
        const prev = r - 1;
        const next = r + 1;
        
        // lostFilter
        const prevIdx = lostFiltered.indexOf(prev); // 앞의 친구가 잃어버렸는지 확인
        const nextIdx = lostFiltered.indexOf(next); // 뒤의 친구가 잃어버렸는지 확인
        if(prevIdx !== -1) { // 앞의 친구가 잃어버렸다(-1이 아니라는 것은 포함되어 있다는 뜻) -> 빌려줘서 분실 대상에서 제외
            lostFiltered.splice(prevIdx, 1);
        } else if(nextIdx !== -1) { // 뒤의 친구가 잃어버렸다(-1이 아니라는 것은 포함되어 있다는 뜻) -> 빌려줘서 분실 대상에서 제외
            lostFiltered.splice(nextIdx, 1); 
        }
    }
    
    const answer = n - lostFiltered.length; // 전체 수에서 현재 남은 분실 인원 수 뺀 것이 return.
    return answer;
}