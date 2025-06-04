import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonIcon } from '@ionic/angular/standalone';
import { LevelShellComponent } from '../level-shell/level-shell.component';
import { addIcons } from 'ionicons';
import { navigateOutline } from 'ionicons/icons';
import { GameService } from 'src/app/game.service';


@Component({
  selector: 'app-geolocation',
  templateUrl: './geolocation.page.html',
  styleUrls: ['./geolocation.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, LevelShellComponent, IonIcon]
})
export class GeolocationPage implements OnInit {

  gameService = inject(GameService);

  ngOnInit() {
    this.gameService.setLevelCompleted(true);
    addIcons({ navigateOutline })
  }
}
