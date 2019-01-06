import {Directive, EventEmitter, HostListener, Output} from '@angular/core';

@Directive({
  selector: '[appRefresher]'
})
export class RefresherDirective {

  @Output() updateLoad: EventEmitter<any> = new EventEmitter();
  previousValue = 0;
  scrollDir: string = undefined;

  @HostListener('scroll', ['$event'])
  onScroll(event) {
    const tracker = event.target;
    if (tracker.scrollTop > this.previousValue) {
      this.scrollDir = 'down';
    } else {
      this.scrollDir = 'up';
    }
    // console.log('scrollDir:', this.scrollDir);

    const limit = tracker.scrollHeight - tracker.clientHeight;
    // console.log(event.target.scrollTop, limit);
    if (event.target.scrollTop === limit) {
      // console.log('end reached');
      this.updateLoad.emit(true);
    } else if (event.target.scrollTop <= Math.floor(limit / 8) && this.scrollDir === 'up') {
      // console.log('scrolled to top');
      this.updateLoad.emit(false);
    }
    this.previousValue = tracker.scrollTop;
  }
}
