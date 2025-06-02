import { Component, OnInit, ViewChild } from '@angular/core';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonMenu, IonLabel, IonList, IonItem, IonButton } from '@ionic/angular/standalone';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-menu-drawer',
  templateUrl: './menu-drawer.component.html',
  styleUrls: ['./menu-drawer.component.scss'],
  imports: [IonContent, IonList, IonMenu, IonItem, IonHeader, IonToolbar, IonTitle, IonLabel, IonButton]
})
export class MenuDrawerComponent {
   @ViewChild(IonMenu) menu!: IonMenu;

  openMenu() {
    this.menu?.open();
  }

  closeMenu() {
    this.menu?.close();
  }
}
