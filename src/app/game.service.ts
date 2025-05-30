import { Injectable, inject } from '@angular/core';
import { LEVELS } from './levels';
import { GameState, Level } from './models';
import { Router } from '@angular/router';
import { last } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class GameService {
    state?: GameState
    private router = inject(Router)

    initGame(username: string) {
        //console.log("out service", username)
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
            this.router.navigate([''])
            //throw new Error('Cannot access game state before initialization!');
        }
        return LEVELS[this.state!.currentLevelIndex]
    }
    nextLevel(): void {
        if (!this.lastLevel()) {
            console.log(this.state?.currentLevelIndex)
            this.state!.currentLevelIndex++;
        }
    }

    lastLevel(): boolean {
        if (!this.state) {
           
            throw new Error('Cannot access game state before initialization!');
        }
        if (this.state?.currentLevelIndex > LEVELS.length - 1) {
            return true;
        }
        else {
            return false;
        }
    }
}
