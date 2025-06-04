import { Injectable, inject, signal } from '@angular/core';
import { LEVELS } from './levels';
import { GameState, Level } from './models';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class GameService {
    state?: GameState
    router = inject(Router)

    currentLevelCompleted = signal(false);

    initGame(username: string) {
        
        this.state = {
            username: username,
            startTime: new Date(),
            mainScore: 0,
            bonusScore: 0,
            currentLevelIndex: 0,
            currentLevelStartTime: new Date(),
            currentLevelCompleted: this.currentLevelCompleted()
        }

        console.log("State on init", this.state);
    }

    getCurrentLevel(): Level {
        if (!this.state) {
            this.resetState();
            window.location.replace('/');
        }
        console.log("Index on Initialize", this.state?.currentLevelIndex)
        return LEVELS[this.state!.currentLevelIndex]
    }

    nextLevel(): void {
        if (!this.lastLevel()) {
            this.state!.currentLevelIndex++;
            this.state!.currentLevelStartTime = new Date();
            this.setLevelCompleted(false);
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

    setLevelCompleted(value: boolean) {
        if (value === true) {
            this.state!.mainScore += 1;
            
            const l = this.getCurrentLevel();
            
            const currenTime = new Date();
            const diffMs = new Date(currenTime.getTime() - this.state!.currentLevelStartTime.getTime());

            if (diffMs.getSeconds() < l.bonusTime_sec) {
                this.state!.bonusScore += 1;
            } 
        }

        this.currentLevelCompleted.set(value);
        this.state!.currentLevelCompleted = value;
    }
}
