import { Component, inject, OnInit, Signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { LevelShellComponent } from "../level-shell/level-shell.component";
import { GameService } from 'src/app/game.service';
import { Network } from '@capacitor/network';
import { ConnectionStatus } from '@capacitor/network';
import { Capacitor } from '@capacitor/core';

@Component({
  selector: 'app-wlan',
  templateUrl: './wlan.page.html',
  styleUrls: ['./wlan.page.scss'],
  standalone: true,
  imports: [IonContent, CommonModule, FormsModule, LevelShellComponent]
})
export class WlanPage implements OnInit {
  private gameService = inject(GameService)

  hasDisconnected?: boolean = false;
  isCompleted: Signal<boolean> = this.gameService.currentLevelCompleted;

  ngOnInit() {
    if(Capacitor.isNativePlatform()) {
      Network.addListener('networkStatusChange', status => this.checkWifi(status))
    } 
    else {
      this.gameService.setLevelCompleted(true);
    }
  }

  checkWifi(status: ConnectionStatus) {
    if (this.gameService.state!.currentLevelCompleted) return;

    if(!status.connected) {
      this.hasDisconnected = true
    }
    if (status.connectionType === 'wifi' && this.hasDisconnected === true) {
      this.gameService.setLevelCompleted(true);
      Network.removeAllListeners();
    }
  }
}
