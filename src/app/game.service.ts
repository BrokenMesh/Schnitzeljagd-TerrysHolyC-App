import { Injectable, inject, signal } from '@angular/core';
import { LEVELS } from './levels';
import { GameState, Level } from './models';
import { Router } from '@angular/router';
import { ApiService } from './api.service';
import { Preferences } from '@capacitor/preferences';
import { Observable } from 'rxjs';
import * as uuid from 'uuid';

@Injectable({
    providedIn: 'root'
})
export class GameService {
    state?: GameState

    router = inject(Router)
    api = inject(ApiService)

    currentLevelCompleted = signal(false);

    initGame(username: string) {
        this.state = {
            id: uuid.v4(),
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

    startNextLevel(): void {
        if (!this.isLastLevel()) {
            this.state!.currentLevelIndex++;
            this.state!.currentLevelStartTime = new Date();
            this.setLevelCompleted(false);
            console.log("Index on nextLevel", this.state?.currentLevelIndex)
        }
    }

    isLastLevel(): boolean {
        if (!this.state) {

            throw new Error('Cannot access game state before initialization!');
        }
        if (this.state?.currentLevelIndex >= LEVELS.length - 1) {
            return true;
        }
        else return false;
    }

    async endGame() {
        this.api.sendUserScore(this.state!);
        
        await Preferences.set({
            key: this.state!.id,
            value: JSON.stringify(this.state!)
        });

        this.resetState();
    }

    resetState() {
        this.state == undefined;
    }

    setLevelCompleted(value: boolean) {
        if (value === true) {
            console.log("Level finished");

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

    async getScoreboard(): Promise<GameState[]> {
        const scoreboard: GameState[] = [];
    
        const { keys } = await Preferences.keys();
        for (const key of keys) {
            const { value } = await Preferences.get({ key });
            if (value == null) continue;
            scoreboard.push(JSON.parse(value));
        }
    
        return scoreboard.sort((a,b) => new Date(b.startTime).getTime() - new Date(a.startTime).getTime());
    }
    
}
