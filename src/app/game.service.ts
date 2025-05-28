import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class GameService {
    state?: GameState

    initGame(username: string) {
        this.state = {
            username: username,
            startTime: new Date(),
            mainScore: 0,
            bonusScore: 0,
            currentLevelIndex: 0
        }
    }


}
