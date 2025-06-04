import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { LevelShellComponent } from '../level-shell/level-shell.component';
import { Geolocation } from '@capacitor/geolocation';
import { GameService } from 'src/app/game.service';
import { Signal } from '@angular/core';

@Component({
  selector: 'app-distance',
  templateUrl: './distance.page.html',
  styleUrls: ['./distance.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, LevelShellComponent]
})
export class DistancePage implements OnInit {

  startPosition: { latitude: number; longitude: number } | null = null;
  distanceMoved: number = 0;

  private gameService = inject(GameService)
  isCompleted: Signal<boolean> = this.gameService.currentLevelCompleted;

  getCurrentPosition = async () => {
    const coordinates = await Geolocation.getCurrentPosition();
    return {
      latitude: coordinates.coords.latitude,
      longitude: coordinates.coords.longitude,
    };
  };
  getDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371e3;
    const φ1 = lat1 * Math.PI / 180;
    const φ2 = lat2 * Math.PI / 180;
    const Δφ = (lat2 - lat1) * Math.PI / 180;
    const Δλ = (lon2 - lon1) * Math.PI / 180;

    const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
      Math.cos(φ1) * Math.cos(φ2) *
      Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c;
  };

  async ngOnInit() {
    this.startPosition = await this.getCurrentPosition();
    this.updateDistance();

  }
  async updateDistance() {
    const current = await this.getCurrentPosition();
    const distance = this.getDistance(
      this.startPosition!.latitude,
      this.startPosition!.longitude,
      current.latitude,
      current.longitude
    )
    if (distance <= 10) {
      this.gameService.setLevelCompleted(true)
    }

    if (this.isCompleted() == false) {
      setTimeout(async () => {
        this.updateDistance();
      }, 1000)
    }
  }

}
