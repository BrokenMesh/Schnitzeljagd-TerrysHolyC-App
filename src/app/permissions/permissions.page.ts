import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonButton } from '@ionic/angular/standalone';
import { Router, ActivatedRoute } from '@angular/router';
import { GameService } from '../game.service';
import { Geolocation } from '@capacitor/geolocation';
import { Camera } from '@capacitor/camera';
import { Capacitor } from '@capacitor/core';

@Component({
  selector: 'app-permissions',
  templateUrl: './permissions.page.html',
  styleUrls: ['./permissions.page.scss'],    
  standalone: true,
  imports: [IonContent, CommonModule, FormsModule, IonButton]
})
export class PermissionsPage implements OnInit {
  username: string | undefined;
  hasGeoPermission: boolean = false;
  hasCamPermission: boolean = false;

  private gameService = inject(GameService)
  private route = inject(ActivatedRoute);
  private router = inject(Router)
  private cdr = inject(ChangeDetectorRef);

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.username = params['username'];
    });

    this.checkPermissions();
  }

  async requestGeoPermissions() {
    await Geolocation.requestPermissions();
    await this.checkPermissions();
  }

  async requestCamPermissions() {
    await Camera.requestPermissions(); 
    await this.checkPermissions();
  }

  startGame() {
    if (this.username) {
      this.gameService.initGame(this.username);
      const lvlRoute: any = this.gameService.getCurrentLevel().route;
      this.router.navigateByUrl(lvlRoute, { replaceUrl: true });
    }
  }

  async checkPermissions() {
    if (Capacitor.isNativePlatform()) {
      const gr = await Geolocation.checkPermissions();
      this.hasGeoPermission = gr.location === 'granted';

      const cr = await Camera.checkPermissions();
      this.hasCamPermission = cr.camera === 'granted';

      this.cdr.detectChanges();
    } 
    else {
      this.hasGeoPermission = true;
      this.hasCamPermission = true;
    }
  }
}

