interface GameState {
    username: string,
    startTime: Date,
    mainScore: number,
    bonusScore: number,
    currentLevelIndex: number, 
}

interface Level {
    name: string;
    route: string;
    bonusTime_sec: number;
}
