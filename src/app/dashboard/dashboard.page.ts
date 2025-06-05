import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonButton, AlertController } from '@ionic/angular/standalone';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  standalone: true,
  imports: [IonContent, CommonModule, FormsModule, IonButton]
})
export class DashboardPage {
  private router = inject(Router);
  private alertController = inject(AlertController);

  public async presentAlert() {
    
    const alert = await this.alertController.create({
      header: 'Name i Gä!!!',
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
      this.router.navigateByUrl('/permissions?username=' + name.trim(), { skipLocationChange: true });
    }
  }
}
