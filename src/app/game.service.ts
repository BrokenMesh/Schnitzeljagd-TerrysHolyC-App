import { Injectable } from '@angular/core';
import { LEVELS } from './levels';
import { GameState, Level } from './models';

@Injectable({
    providedIn: 'root'
})
export class GameService {
    state?: GameState

    initGame(username: string) {
        console.log("out service", username)
        this.state = {
            username: username,
            startTime: new Date(),
            mainScore: 0,
            bonusScore: 0,
            currentLevelIndex: 0
        }
    }

    getCurrentLevel(): Level {
        if (!this.state) {
            throw new Error('Cannot access game state before initialization!');
        }

        return LEVELS[this.state.currentLevelIndex]
    }
    nextLevel(): void {
        if (!this.state) {
            throw new Error('Cannot access game state before initialization!');
        }
        if (this.state?.currentLevelIndex < LEVELS.length -1) {
            this.state.currentLevelIndex++;
        }
    }
}
