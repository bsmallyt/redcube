import { Component } from '@angular/core';
import { DynamicIsland } from '@bennnyt/capacitor-dynamic-island';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonIcon } from '@ionic/angular/standalone';
import { AppGame } from './game.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonButton, IonHeader, IonToolbar, IonTitle, IonContent, AppGame],
})
export class HomePage {
  constructor() {}

  testDynamicIsland() {
    DynamicIsland.alert({
      message: 'Pushed.'
    })
  }
}
