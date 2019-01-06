import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HomePage } from './home.page';
import { DivContainerComponent } from '../components/div-container/div-container.component';
import { IonContentContainerComponent } from '../components/ion-content-container/ion-content-container.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomePage
      }
    ])
  ],
  declarations: [
    HomePage,
    DivContainerComponent,
    IonContentContainerComponent
  ],
  entryComponents: [
    DivContainerComponent,
    IonContentContainerComponent
  ]
})
export class HomePageModule {}
