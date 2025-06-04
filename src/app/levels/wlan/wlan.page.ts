import { Component, inject, OnInit, Signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { LevelShellComponent } from "../level-shell/level-shell.component";
import { GameService } from 'src/app/game.service';
import { Network } from '@capacitor/network';
import { ConnectionStatus } from '@capacitor/network';

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
    Network.addListener('networkStatusChange', status => {
      console.log(status)
      this.checkWifi(status)
    })
  }
  checkWifi(status: ConnectionStatus) {
    if(!status.connected) {
      console.log("cock")
      this.hasDisconnected = true
    }
    if (status.connectionType === 'wifi' && this.hasDisconnected === true) {
      console.log("balls")
      this.gameService.setLevelCompleted(true)
    }
  }
}
