import { Component, Output, EventEmitter } from '@angular/core';
import { of, fromEvent, concat, defer } from 'rxjs';
import {map, exhaustMap, takeUntil, startWith, tap, takeWhile, repeat, debounceTime} from 'rxjs/operators';
import {RxAnimationsService} from '../../services/rx-animations.service';
import {NewsService} from '../../services/news.service';

@Component({
  selector: 'app-refresher',
  templateUrl: './refresher.component.html',
  styleUrls: ['./refresher.component.scss']
})
export class RefresherComponent {
  @Output()
  refresh = new EventEmitter<any>();

  // tslint:disable-next-line:variable-name
  private _pos = 0;

  touchStart$ = fromEvent<TouchEvent>(document, 'touchstart');
  touchMove$ = fromEvent<TouchEvent>(document, 'touchmove');
  touchEnd$ = fromEvent<TouchEvent>(document, 'touchend');

  touchDrag$ = this.touchStart$.pipe(
    exhaustMap(start => {
      return concat(
        this.touchMove$.pipe(
          map(move => move.touches[0].pageY - start.touches[0].pageY),
          takeUntil(this.touchEnd$),
          tap(p => this._pos = p),
        ),
        this.moveHome$,
      );
    }),
    tap(y => {
      if (y > window.innerHeight / 2) {
        this.refresh.emit();
      }
    }),
    takeWhile(y => y <= window.innerHeight / 2),
  );

  moveHome$ = defer(() => this.rxAnimations.tween(this._pos, 0, 200));

  moveHomeAfterLoad$ = this.newsService.loadNews$.pipe(
    exhaustMap(() => this.moveHome$)
  );

  positionUpdate$ = concat(
    this.touchDrag$,
    this.moveHomeAfterLoad$,
  ).pipe(
    repeat()
  );

  position$ = this.positionUpdate$.pipe(
    startWith(0),
    map(y => y - 30),
  );

  transformPosition$ = this.position$.pipe(
    map(y => `translate3d(-35px, ${y}px, 0)`)
  );

  rotate$ = this.newsService.refresh$.pipe(
    exhaustMap(() => this.rxAnimations.tween(0, 360, 500).pipe(
      repeat(),
      takeUntil(this.newsService.loadNews$),
      x => concat(x, of(0)), // endWith(0)
    ))
  );

  transformRotate$ = this.rotate$.pipe(
    map(r => `rotate(${r}deg)`)
  );

  constructor(private newsService: NewsService, private rxAnimations: RxAnimationsService) { }
}
