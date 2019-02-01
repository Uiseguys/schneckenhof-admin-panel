import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToasterService } from 'angular2-toaster';

import { NewsService } from '../news.service';

@Component({
  selector: 'app-editNews-page',
  templateUrl: './editNews.page.html',
  styleUrls: ['./editNews.page.scss']
})
export class EditNewsPage implements OnInit {
  error = '';
  news: any = {};

  constructor(
    private route: ActivatedRoute,
    public router: Router,
    private toasterService: ToasterService,
    private api: NewsService
  ) {
    this.route.params.subscribe(params => {
      this.api.getSingleNews(params.id).subscribe(res => {
        this.news = res;
      });
    });
  }

  ngOnInit() {}

  handleSubmit(values) {
    this.api
      .updateNews(this.news.id, {
        ...this.news,
        ...values
      })
      .subscribe(
        res => {
          this.toasterService.popAsync('success', '', 'News has been updated');
          this.router.navigate(['/dashboard/news']);
        },
        res => {
          const body = JSON.parse(res._body);
          this.toasterService.popAsync(
            'error',
            '',
            (body.error && body.error.message) || 'Sorry, something is wrong'
          );
        }
      );
  }
}
