import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {NewsModel} from '../models/news.model';
import {exhaustMap, map, share} from 'rxjs/operators';

const NEWS_URL = './assets/news.json';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  loadNews$: Observable<NewsModel[]> = this.http.get<NewsModel[]>(NEWS_URL).pipe(
    map((news: NewsModel[]) => {
      return shuffle(news);
    }),
    share()
  );

  refresh$ = new BehaviorSubject(null);

  news$ = this.refresh$.pipe(
    exhaustMap(() => this.loadNews$)
  );


  constructor(private http: HttpClient) {}
}

export function shuffle(array) {
  // tslint:disable-next-line:one-variable-per-declaration
  let currentIndex = array.length, temporaryValue, randomIndex;
  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}



