import {Component} from '@angular/core';
import {Observable} from 'rxjs';
import {NewsService} from '../../services/news.service';
import {NewsModel} from '../../models/news.model';

@Component({
  selector: 'app-ngrx-refresher',
  templateUrl: './ngrx-refresher.component.html',
  styleUrls: ['./ngrx-refresher.component.scss']
})
export class NgRxRefresherComponent {

  news$: Observable<NewsModel[]> = this.newsService.news$;

  constructor(public newsService: NewsService) { }
}
