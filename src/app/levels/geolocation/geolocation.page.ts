import { ChangeDetectorRef, Component, inject, OnInit, Signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonIcon } from '@ionic/angular/standalone';
import { LevelShellComponent } from '../level-shell/level-shell.component';
import { addIcons } from 'ionicons';
import { navigateOutline } from 'ionicons/icons';
import { GameService } from 'src/app/game.service';
import { Geolocation } from '@capacitor/geolocation';
import { getDistance } from 'src/app/gps';

@Component({
  selector: 'app-geolocation',
  templateUrl: './geolocation.page.html',
  styleUrls: ['./geolocation.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, LevelShellComponent, IonIcon]
})
export class GeolocationPage implements OnInit {
  gameService = inject(GameService);
  private cdr = inject(ChangeDetectorRef);

  isCompleted: Signal<boolean> = this.gameService.currentLevelCompleted;

  distance: number = 0;

  ngOnInit() {
    addIcons({ navigateOutline })
    this.updateDistance();
  }

  getCurrentPosition = async () => {
    const coordinates = await Geolocation.getCurrentPosition();
    return {
      latitude: coordinates.coords.latitude,
      longitude: coordinates.coords.longitude,
    };
  };

  async updateDistance() {
    const current = await this.getCurrentPosition();

    const target = {
        latitude: 47.027578850500234,
        longitude:  8.300820734423015,
    }

    const d = getDistance(current.latitude, current.longitude, target.latitude, target.longitude)
    this.distance = d;

    if (d <= 10) {
      this.gameService.setLevelCompleted(true)
    }

    this.cdr.detectChanges();

    if (this.isCompleted() == false) {
      setTimeout(() => this.updateDistance(), 1000);
    }
  }
}
