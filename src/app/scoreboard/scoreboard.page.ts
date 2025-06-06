import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonButton } from '@ionic/angular/standalone';
import { GameService } from '../game.service';
import { GameState } from '../models';

@Component({
  selector: 'app-scoreboard',
  templateUrl: './scoreboard.page.html',
  styleUrls: ['./scoreboard.page.scss'],
  standalone: true,
  imports: [IonContent, CommonModule, FormsModule, IonButton]
})
export class ScoreboardPage implements OnInit {
  gameService = inject(GameService);
  private cdr = inject(ChangeDetectorRef);

  scoreboard: GameState[] = [];

  ngOnInit() {
    this.loadScoreboard();
  }

  async loadScoreboard() {
    this.scoreboard = await this.gameService.getScoreboard();
    this.cdr.detectChanges();
  }

  restartGame() {
    window.location.replace('/')
  }

}
