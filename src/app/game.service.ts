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
        console.log("State on init", this.state);
    }

    getCurrentLevel(): Level {
        if (!this.state) {
            //not working
            //on page reload state errors
            this.resetState();
            this.router.navigate([''])
            //throw new Error('Cannot access game state before initialization!');
        }
        console.log("Index on Initialize", this.state?.currentLevelIndex)
        return LEVELS[this.state!.currentLevelIndex]
    }
    nextLevel(): void {
        if (!this.lastLevel()) {
            this.state!.currentLevelIndex++;
            console.log("Index on nextLevel", this.state?.currentLevelIndex)
        }
    }

    lastLevel(): boolean {
        if (!this.state) {

            throw new Error('Cannot access game state before initialization!');
        }
        if (this.state?.currentLevelIndex >= LEVELS.length - 1) {
            return true;
        }
        else return false;
    }
    resetState() {
        this.state == undefined;
    }
}
