import { ChangeDetectorRef, Component, inject, OnInit, Signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonButton } from '@ionic/angular/standalone';
import { LevelShellComponent } from '../level-shell/level-shell.component';
import { CapacitorBarcodeScanner } from '@capacitor/barcode-scanner';
import { GameService } from 'src/app/game.service';
import { Capacitor } from '@capacitor/core';

@Component({
  selector: 'app-qr',
  templateUrl: './qr.page.html',
  styleUrls: ['./qr.page.scss'],
  standalone: true,
  imports: [IonContent, CommonModule, FormsModule, IonButton, LevelShellComponent]
})
export class QrPage implements OnInit {
  gameService = inject(GameService);
  private cdr = inject(ChangeDetectorRef);
  
  isCompleted: Signal<boolean> = this.gameService.currentLevelCompleted;
  errorMessage: string = "";

  ngOnInit() {
    if(Capacitor.isNativePlatform()) {
      this.scan()
    } 
    else {
      this.gameService.setLevelCompleted(true);
    }
  }

  async scan() {
      const config = {
        hint: 0,
        scanInstructions: "bitte korrekte QR Code scannen!",
        cameraDirection: 1,
        scanOrientation: 1,
      };

      const res = await CapacitorBarcodeScanner.scanBarcode(config);

      if (res.ScanResult == "M335@ICT-BZ") {
        this.gameService.setLevelCompleted(true);
      }
      else {
        this.errorMessage = "QR Code ist falsch!!!"
      }
      
      this.cdr.detectChanges();
  }

}
