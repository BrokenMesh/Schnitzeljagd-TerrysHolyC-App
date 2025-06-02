import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { StepperModule } from 'primeng/stepper'
import { IonContent, IonHeader, IonTitle, IonToolbar, IonMenu, IonItem, IonList } from '@ionic/angular/standalone';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonApp, IonRouterOutlet, StepperModule, IonContent, IonHeader, IonToolbar, IonMenu, IonItem, IonTitle, IonList],
})
export class AppComponent {
}
