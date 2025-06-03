export interface GameState {
    username: string,
    startTime: Date,
    mainScore: number,
    bonusScore: number,
    currentLevelIndex: number, 
    currentLevelStartTime: Date,
}

export interface Level {
    name: string;
    route: string;
    bonusTime_sec: number;
}
