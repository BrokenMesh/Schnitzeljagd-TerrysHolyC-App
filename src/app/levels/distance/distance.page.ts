import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { LevelShellComponent } from '../level-shell/level-shell.component';
import { Geolocation } from '@capacitor/geolocation';
import { GameService } from 'src/app/game.service';
import { Signal } from '@angular/core';
import { getDistance } from 'src/app/gps';

@Component({
  selector: 'app-distance',
  templateUrl: './distance.page.html',
  styleUrls: ['./distance.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, LevelShellComponent]
})
export class DistancePage implements OnInit {
  private cdr = inject(ChangeDetectorRef);
  private gameService = inject(GameService)

  startPosition: { latitude: number; longitude: number } | null = null;
  distanceMoved: number = 0;

  isCompleted: Signal<boolean> = this.gameService.currentLevelCompleted;

  async ngOnInit() {
    this.startPosition = await this.getCurrentPosition();
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
    let current: any = 0;
    try {
      current = await this.getCurrentPosition();
    } catch (e) {
      console.log(e)
    }

    const distance = getDistance(
      this.startPosition!.latitude,
      this.startPosition!.longitude,
      current.latitude,
      current.longitude
    )
    this.distanceMoved = distance
    if (distance >= 10) {
      this.gameService.setLevelCompleted(true)
    }

    this.cdr.detectChanges();

    if (this.isCompleted() == false) {
      setTimeout(async () => {
        this.updateDistance();
      }, 1000)
    }
  }
}
