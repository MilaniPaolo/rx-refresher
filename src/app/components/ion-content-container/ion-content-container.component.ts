import {Component, HostListener, OnInit, Renderer2} from '@angular/core';
import {Card} from '../../home/home.page';
import * as Hammer from 'hammerjs';

@Component({
  selector: 'app-ion-content-container',
  templateUrl: './ion-content-container.component.html',
  styleUrls: ['./ion-content-container.component.scss']
})
export class IonContentContainerComponent implements OnInit {

  cards: Card[] = [];
  previousValue = 0;
  scrollDir: string = undefined;
  contentElement: any;
  refresherElement: any;
  imageElement: any;
  mc: any;

  constructor(private renderer: Renderer2) {}

  ngOnInit() {
    this.contentElement = document.getElementById('content');
    this.refresherElement = document.getElementById('refresher');
    this.imageElement = document.getElementById('arrowRounded');
    this.mc = new Hammer(this.contentElement);
    this.mc.get('pan').set({ enable: false });
    for (let i = 0; i < 10; i++) {
      const card = <Card> {
        context: '"Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit..."',
        number: i + 1
      };
      this.cards.push(card);
    }
  }

  @HostListener('scroll', ['$event'])
  onScroll(event) {
    const tracker = event.target;
    if (tracker.scrollTop > this.previousValue) {
      this.scrollDir = 'down';
    } else {
      this.scrollDir = 'up';
    }
    const limit = tracker.scrollHeight - tracker.clientHeight;
    if (this.scrollDir === 'down') {
      this.mc.get('pan').set({ enable: false });
    } else if (this.scrollDir === 'up' && event.target.scrollTop <= Math.floor(limit / 8)) {
      this.mc.get('pan').set({ enable: true, direction: Hammer.DIRECTION_ALL});
      this.mc.on('panstart panend panup pandown', (ev) => {
        switch (ev.type) {
          case 'pandown':
            this.renderer.setStyle(this.refresherElement, 'transform', 'translateY(' + ev.distance / 2 + 'px)');
            this.renderer.setStyle(this.imageElement, 'transform', 'rotate(' + -ev.distance / 2 + 'deg)');
            break;
          case 'panend':
            this.renderer.setStyle(this.refresherElement, 'transform', 'translateY(' + -60 + 'px)');
            this.renderer.setStyle(this.imageElement, 'transform', 'rotate(' + 0 + 'deg)');

            break;
          case 'panup':
            if (ev.distance < 50) {
              this.renderer.setStyle(this.refresherElement, 'transform', 'translateY(' + -60 + 'px)');
              this.renderer.setStyle(this.imageElement, 'transform', 'rotate(' + 0 + 'deg)');
            } else if (this.refresherElement.style.cssText === 'transform: translateY(-60px);') {
              this.mc.get('pan').set({ enable: false });
            } else {
              this.renderer.setStyle(this.refresherElement, 'transform', 'translateY(' + ev.distance / 2 + 'px)');
              this.renderer.setStyle(this.imageElement, 'transform', 'rotate(' + -ev.distance / 2 + 'deg)');
            }
            break;
          default:
            break;
        }
      });
    }
    this.previousValue = tracker.scrollTop;
  }

}
