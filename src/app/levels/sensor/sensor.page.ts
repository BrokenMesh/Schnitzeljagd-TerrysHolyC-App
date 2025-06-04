import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent } from '@ionic/angular/standalone';
import { LevelShellComponent } from '../level-shell/level-shell.component';
import { Motion } from '@capacitor/motion';
import { Capacitor, PluginListenerHandle } from '@capacitor/core'
import { GameService } from 'src/app/game.service';

@Component({
  selector: 'app-sensor',
  templateUrl: './sensor.page.html',
  styleUrls: ['./sensor.page.scss'],
  standalone: true,
  imports: [IonContent, CommonModule, FormsModule, LevelShellComponent]
})
export class SensorPage implements OnInit {
  private gameService = inject(GameService)
  accelHandler?: PluginListenerHandle;

  ngOnInit() {
    if(Capacitor.isNativePlatform()) {
      this.startAcceleration()
    } 
    else {
      this.gameService.setLevelCompleted(true);
    }
  }

  async startAcceleration() {
    this.accelHandler = await Motion.addListener('accel', event => {
      const z = event.acceleration?.z;
      if (z < -9) {
        this.gameService.setLevelCompleted(true);
        this.stopAcceleration();
      }
    })
  }

  stopAcceleration() {
    if (this.accelHandler) {
      this.accelHandler.remove();
    }
  };
}
