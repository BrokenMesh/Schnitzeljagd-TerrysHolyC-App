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
import { Capacitor } from '@capacitor/core';

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
    if(Capacitor.isNativePlatform()) {
      this.updateDistance();
    } 
    else {
      this.gameService.setLevelCompleted(true);
    }

    addIcons({ navigateOutline })
  }

  getCurrentPosition = async () => {
    const coordinates = await Geolocation.getCurrentPosition();
    return {
      latitude: coordinates.coords.latitude,
      longitude: coordinates.coords.longitude,
    };
  };

  async updateDistance() {
    try {
      const current = await this.getCurrentPosition();

      const target = {
        latitude: 47.02749804944801,
        longitude: 8.300887115703024,
      };

      const d = getDistance(current.latitude, current.longitude, target.latitude, target.longitude);
      this.distance = d;

      if (d <= 10) {
        this.gameService.setLevelCompleted(true);
      }

      this.cdr.detectChanges();
    }
    catch (e) {
      console.log(e);
    }

    if (this.isCompleted() == false) {
      setTimeout(() => this.updateDistance(), 1000);
    }
  }
}
