import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonAlert } from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { GameService } from '../game.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButton, IonAlert]
})
export class DashboardPage implements OnInit {

  constructor(
    private router: Router,
    private alertController: AlertController,
  ) { }

  private gameService = inject(GameService);

  public async presentAlert() {
    
    const alert = await this.alertController.create({
      header: 'Sind sie so guet und gebed sie doch ihre Name ih',
      inputs: [
        {
          name: 'name',
          type: 'text',
          placeholder: 'Name'
        }
      ],
      buttons: [
        {
          text: 'Weiter',
          handler: (data) => {
            this.handleAlertData(data);
            return true;
          }
        }
      ]
    });

    await alert.present();
  }
  handleAlertData(data: any) {
    const name: string = data.name;
    if (name.trim().length > 0) {
      this.router.navigate(['/permissions'], { queryParams: { username: name.trim() } });
    }
  }
  ngOnInit() {
  }

}
