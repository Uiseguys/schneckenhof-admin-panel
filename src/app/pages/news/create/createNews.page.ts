import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToasterService } from 'angular2-toaster';

import { NewsService } from '../news.service';

@Component({
  selector: 'app-createNews-page',
  templateUrl: './createNews.page.html',
  styleUrls: ['./createNews.page.scss']
})
export class CreateNewsPage implements OnInit {
  type = '';

  constructor(
    private route: ActivatedRoute,
    public router: Router,
    private toasterService: ToasterService,
    private api: NewsService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.type = params.type;
    });
  }

  handleSubmit(values) {

    if (values.showOnHome == true) {
      this.api.getNews(this.type).subscribe(res => {
        if (res && res.length) {
          res.map((news) => {
            if (news.showOnHome == true) {
              this.router.navigate(['/dashboard/news']);
              let updated = news;
           //   updated.showOnHome = false;
              this.api
                .updateNews(news.id, {
                  ...news,
                  ...updated
                })
                .subscribe(
                  res => {
                  }
                );
            }
          })
        }
      });
    }
    this.api
      .createNews({
        ...values,
        type: this.type
      })
      .subscribe(
        res => {
          this.toasterService.popAsync('success', '', 'News has been created');
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
