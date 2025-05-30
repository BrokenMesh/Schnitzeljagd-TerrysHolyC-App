import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonIcon  } from '@ionic/angular/standalone';
import { LevelShellComponent } from '../level-shell/level-shell.component';
import { addIcons } from 'ionicons';
import { navigateOutline } from 'ionicons/icons';

@Component({
  selector: 'app-device-status',
  templateUrl: './device-status.page.html',
  styleUrls: ['./device-status.page.scss'],
  standalone: true,
  imports: [IonContent, IonButton, CommonModule, FormsModule, LevelShellComponent, IonIcon]
})
export class DeviceStatusPage implements OnInit {

   constructor() {
    addIcons({ navigateOutline })
  }
  ngOnInit() {
  }

}
