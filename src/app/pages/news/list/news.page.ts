import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, Subject } from 'rxjs';

import { SettingsService } from '../../../services/settings/settings.service';
import { NewsService } from '../../../pages/news/news.service';

@Component({
  selector: 'app-news-page',
  templateUrl: './news.page.html',
  styleUrls: ['./news.page.scss'],
  encapsulation: ViewEncapsulation.None
})
export class NewsPage implements OnInit {
  type = '';

  news: any;
  error = '';

  constructor(
    private route: ActivatedRoute,
    public router: Router,
    private api: NewsService,
    private settings: SettingsService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.type = params.type;

      this.api.getNews(this.type).subscribe(res => {
        this.news = res;
      });
    });
  }

  delete(news) {
    if (!confirm('Are you sure to delete')) {
      return;
    }

    this.api.deleteNews(news.id).subscribe(
      res => {
        this.news = this.news.filter(item => item.id != news.id);
      },
      res => {
        const error = JSON.parse(res._body);
        this.error =
          (error.error && error.error.message) || 'Sorry, something is wrong';
      }
    );
  }

  getRoleName(role) {
    return role.map(item => item.name).join(',');
  }
}
