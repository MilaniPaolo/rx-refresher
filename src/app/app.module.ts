import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {NgRxRefresherComponent} from './components/ngrx-refresher/ngrx-refresher.component';
import {HttpClientModule} from '@angular/common/http';
import {RefresherComponent} from './components/refresher/refresher.component';

@NgModule({
  declarations: [
    AppComponent,
    NgRxRefresherComponent,
    RefresherComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
