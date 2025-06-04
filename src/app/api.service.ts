import { Injectable } from '@angular/core';
import { CapacitorHttp } from '@capacitor/core';
import { GameState } from './models';

@Injectable({
    providedIn: 'root',
})
export class ApiService {
    sendUserScore(gameState: GameState) {
        const url = 'https://docs.google.com/forms/u/0/d/e/1FAIpQLSc9v68rbCckYwcIekRLOaVZ0Qdm3eeh1xCEkgpn3d7pParfLQ/formResponse';
        
        const currenTime = new Date();
        const diffMs = currenTime.getTime() - gameState.currentLevelStartTime.getTime();
        const totalSeconds = Math.floor(diffMs / 1000);

        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;

        const durationStr = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

        const data =
            `entry.1860183935=${gameState.username}` + // Name
            `&entry.564282981=${gameState.mainScore}` + // Schnitzel
            `&entry.1079317865=${gameState.bonusScore}` + // Potatoes
            `&entry.985590604=${durationStr}`; // Duration

        const headers = { 
            'Content-Type': 'application/x-www-form-urlencoded',
        }

        CapacitorHttp.post({ url, headers, data });
    }
}
