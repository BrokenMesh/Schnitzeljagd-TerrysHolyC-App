import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton } from '@ionic/angular/standalone';
import { LevelShellComponent } from '../level-shell/level-shell.component';
import { addIcons } from 'ionicons';
import { navigateOutline, trendingDown } from 'ionicons/icons';
import { GameService } from 'src/app/game.service';
import { Device } from '@capacitor/device';

@Component({
  selector: 'app-device-status',
  templateUrl: './device-status.page.html',
  styleUrls: ['./device-status.page.scss'],
  standalone: true,
  imports: [IonContent, CommonModule, FormsModule, LevelShellComponent]
})
export class DeviceStatusPage implements OnInit {
  gameService = inject(GameService);

  ngOnInit() {
    this.logChargingStatus()

  }
  logChargingStatus = async () => {
    const info = await Device.getBatteryInfo();

    if (info.isCharging) {
      this.gameService.setLevelCompleted(true)
    }

    setInterval(() => {
      this.logChargingStatus();
    }, 2000);
  }
}
