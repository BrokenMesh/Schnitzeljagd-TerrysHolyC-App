import { Component, OnInit, inject, ViewChild } from '@angular/core';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonMenu, IonMenuButton, IonButtons, IonList, IonItem } from '@ionic/angular/standalone';
import { StepperModule } from 'primeng/stepper';
import { GameService } from 'src/app/game.service';
import { Router } from '@angular/router';
import { MenuDrawerComponent } from 'src/app/menu-drawer/menu-drawer.component';
@Component({
  selector: 'app-level-shell',
  templateUrl: './level-shell.component.html',
  styleUrls: ['./level-shell.component.scss'],
  imports: [IonContent, IonButton, StepperModule, IonMenu, IonMenuButton, IonTitle, IonToolbar, IonHeader, MenuDrawerComponent, IonList, IonItem],
  standalone: true,
})
export class LevelShellComponent implements OnInit {

  @ViewChild(MenuDrawerComponent) menuDrawer!: MenuDrawerComponent;
  uID = 'main-content-' + Math.random().toString(36).substr(2, 9);

  buttonName: string = 'Weiter'
  levelName: string = '';

  public gameService = inject(GameService);
  private router = inject(Router)

  currentStep = 0;

  ngOnInit() {
    this.levelName = this.gameService.getCurrentLevel().name;
    this.currentStep = this.gameService.state?.currentLevelIndex ?? 1;
    this.currentStep++;

    if (this.gameService.lastLevel()) {
      this.buttonName = 'Abschliessen'
    }
  }
  onNext() {
    this.gameService.nextLevel();
    const lvlRoute: any = this.gameService.getCurrentLevel().route;
    this.router.navigate([lvlRoute]);
  }
  openMenu() {
    this.menuDrawer.openMenu();
  }
}
