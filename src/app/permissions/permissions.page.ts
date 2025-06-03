import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton } from '@ionic/angular/standalone';
import { Router, ActivatedRoute } from '@angular/router';
import { GameService } from '../game.service';

@Component({
  selector: 'app-permissions',
  templateUrl: './permissions.page.html',
  styleUrls: ['./permissions.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButton]
})
export class PermissionsPage implements OnInit {
  username: string | undefined;

  private gameService = inject(GameService)
  private route = inject(ActivatedRoute);
  private router = inject(Router)

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.username = params['username'];
    });
  }
  
  async requestPermissions() {
    if (this.username) {
      this.gameService.initGame(this.username);
      const lvlRoute: any = this.gameService.getCurrentLevel().route;
      this.router.navigate([lvlRoute])
    }
  }
}

