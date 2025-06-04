import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { LevelShellComponent } from '../level-shell/level-shell.component';
import { Motion } from '@capacitor/motion';
import { PluginListenerHandle } from '@capacitor/core'
import { GameService } from 'src/app/game.service';

@Component({
  selector: 'app-sensor',
  templateUrl: './sensor.page.html',
  styleUrls: ['./sensor.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, LevelShellComponent]
})
export class SensorPage implements OnInit {

  accelHandler?: PluginListenerHandle;
  private gameService = inject(GameService)
  onComplete = this.gameService.state?.currentLevelCompleted;
  
  async ngOnInit() {
    this.accelHandler = await Motion.addListener('accel', event => {
      const z = event.acceleration?.z;
      if (z < -9) {
       this.gameService.setLevelCompleted(true);
        this.stopAcceleration();
      }
    })
  }
  stopAcceleration = () => {
    if (this.accelHandler) {
      this.accelHandler.remove();
    }
  };
}
