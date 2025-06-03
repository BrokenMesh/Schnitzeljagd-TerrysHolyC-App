import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonMenu, IonLabel, IonList, IonItem, IonButton } from '@ionic/angular/standalone';
import { GameService } from '../game.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu-drawer',
  templateUrl: './menu-drawer.component.html',
  styleUrls: ['./menu-drawer.component.scss'],
  imports: [IonContent, IonList, IonMenu, IonItem, IonHeader, IonToolbar, IonTitle, IonLabel, IonButton]
})
export class MenuDrawerComponent {
  @ViewChild(IonMenu) menu!: IonMenu;
  private gameService = inject(GameService)
  private router = inject(Router)

  curMainscore: number = 0;
  curBonusscore: number = 0;

  openMenu() {
    this.menu?.open();
    this.curMainscore = this.gameService.state!.mainScore;
    this.curBonusscore = this.gameService.state!.bonusScore;
  }

  closeMenu() {
    this.menu?.close();
  }
  skipLevel(): void {
    this.gameService.nextLevel()
    const nxtLvl = this.gameService.getCurrentLevel().route
    this.router.navigate([nxtLvl])
  }
}
