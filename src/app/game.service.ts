import { Injectable } from '@angular/core';
import { LEVELS } from './levels';

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

    getCurrentLevel(): Level{        
        if (this.state === undefined) {
            throw new Error('Cannot access game state before initialization!');
        }

        return LEVELS[this.state.currentLevelIndex]
    }
}
