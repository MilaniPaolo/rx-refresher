import {Component, HostListener, OnInit, Renderer2} from '@angular/core';
import * as Hammer from 'hammerjs';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
}

export interface Card {
  context: string;
  number: number;
}
