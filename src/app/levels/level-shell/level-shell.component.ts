import { Component, OnInit, inject } from '@angular/core';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonMenu, IonMenuButton, IonButtons } from '@ionic/angular/standalone';
import { StepperModule } from 'primeng/stepper';
import { GameService } from 'src/app/game.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-level-shell',
  templateUrl: './level-shell.component.html',
  styleUrls: ['./level-shell.component.scss'],
  imports: [IonContent, IonButton, StepperModule, IonMenu, IonMenuButton, IonTitle, IonToolbar, IonHeader, IonButtons],
  standalone: true,
})
export class LevelShellComponent implements OnInit {

  buttonName: string = 'Weiter'
  levelName: string = '';

  public gameService = inject(GameService);
  private router = inject(Router)

  currentStep = 0;
  ngOnInit() {
    //console.log("shell init local step", this.currentStep, "service step", this.gameService.state?.currentLevelIndex)
    console.log(this.gameService.getCurrentLevel().name)
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
}
