import { inject, Injectable } from '@angular/core';
import { LEVELS } from './levels';
import { GameState, Level } from './models';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class GameService {
    state?: GameState
    router = inject(Router)

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

    startNextLevel() {
        if (this.state === undefined) {
            throw new Error('Cannot access game state before initialization!');
        }

        this.state.currentLevelIndex++;
        const l = this.getCurrentLevel();
        this.router.navigate([l.route]);
    }
}
