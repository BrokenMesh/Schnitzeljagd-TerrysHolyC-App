import { Component, ViewChild, inject } from '@angular/core';
import { IonContent, IonHeader, IonToolbar, IonMenu, IonButton } from '@ionic/angular/standalone';
import { GameService } from '../game.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu-drawer',
  templateUrl: './menu-drawer.component.html',
  styleUrls: ['./menu-drawer.component.scss'],
  imports: [IonContent, IonMenu, IonHeader, IonToolbar, IonButton]
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
    if(this.gameService.isLastLevel()) {
      this.router.navigate(['scoreboard'])
      this.gameService.endGame()
      return;
    }
    this.gameService.startNextLevel()
    const nxtLvl = this.gameService.getCurrentLevel().route
    this.router.navigate([nxtLvl])
  }
  quitGame(): void {
    window.location.replace('/')
  }
}
