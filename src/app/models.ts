import { Observable } from "rxjs";

export interface GameState {
    id: string,
    username: string,
    startTime: Date,
    mainScore: number,
    bonusScore: number,
    currentLevelIndex: number, 
    currentLevelStartTime: Date,
    currentLevelCompleted: boolean
}

export interface Level {
    name: string;
    route: string;
    bonusTime_sec: number;
}
