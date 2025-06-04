import { Component, OnInit, inject, ViewChild, ChangeDetectorRef } from '@angular/core';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonMenu, IonMenuButton, IonButtons, IonList, IonItem } from '@ionic/angular/standalone';
import { StepperModule } from 'primeng/stepper';
import { GameService } from 'src/app/game.service';
import { Router } from '@angular/router';
import { MenuDrawerComponent } from 'src/app/menu-drawer/menu-drawer.component';
import { Signal } from '@angular/core';

@Component({
  selector: 'app-level-shell',
  templateUrl: './level-shell.component.html',
  styleUrls: ['./level-shell.component.scss'],
  imports: [IonContent, IonButton, StepperModule, IonMenu, IonMenuButton, IonTitle, IonToolbar, IonHeader, MenuDrawerComponent, IonList, IonItem],
  standalone: true,
})
export class LevelShellComponent implements OnInit {
  @ViewChild(MenuDrawerComponent) menuDrawer!: MenuDrawerComponent;

  gameService = inject(GameService);
  private router = inject(Router)
  private cdr = inject(ChangeDetectorRef);

  uID = 'main-content-' + Math.random().toString(36).substr(2, 9);
  diffMs?: Date;
  buttonName: string = 'Weiter'
  levelName: string = '';
  levelTime: string = '00:00';
  isOvertime: boolean = false;

  currentStep = 0;

  isCompleted: Signal<boolean> = this.gameService.currentLevelCompleted;

  ngOnInit() {
    this.levelName = this.gameService.getCurrentLevel().name;
    this.currentStep = this.gameService.state?.currentLevelIndex ?? 1;
    this.currentStep++;

    if (this.gameService.lastLevel()) {
      this.buttonName = 'Abschliessen'
    }

    this.updateLevelTime();
  }

  onNext() {
    if (this.gameService.lastLevel()) {
      this.router.navigate(['scoreboard'])
      return;
    }
    this.gameService.nextLevel();
    const lvlRoute: any = this.gameService.getCurrentLevel().route;
    this.router.navigateByUrl(lvlRoute, { skipLocationChange: true });

  }

  openMenu() {
    this.menuDrawer.openMenu();
  }

  updateLevelTime() {
    if (this.gameService.state != undefined) {
      const currenTime = new Date();

      this.diffMs = new Date(currenTime.getTime() - this.gameService.state!.currentLevelStartTime.getTime());
      this.levelTime = this.diffMs.toISOString().slice(14, 19);

      this.cdr.detectChanges();

      if (this.gameService.getCurrentLevel().bonusTime_sec <= this.diffMs!.getSeconds()) {
        console.log(this.diffMs.getSeconds())
        this.isOvertime = true;
      }
    }
    
    if (this.isCompleted() == false) {
      setTimeout(() => this.updateLevelTime(), 1000);
    }
  }
}
