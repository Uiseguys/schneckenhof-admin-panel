import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { NewsService } from '../../../pages/news/news.service';
import { ToasterService } from 'angular2-toaster';
import { SettingService } from '../../../pages/setting/setting.service';

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
    introNews: any;

    constructor(
        private route: ActivatedRoute,
        public router: Router,
        private api: NewsService,
        private toasterService: ToasterService,
        private settingApi: SettingService
    ) {}

    ngOnInit() {
        this.route.params.subscribe(params => {
            this.type = params.type;

            this.api.getNews(this.type).subscribe(res => {
                if (res && res.length > 0) {
                    this.news = res.sort(function(a, b) {
                        if (new Date(a.startDate) < new Date(b.startDate)) {
                            return -1;
                        }
                        if (new Date(a.startDate) > new Date(b.startDate)) {
                            return +1;
                        }
                        return 0;
                    });
                } else {
                    this.news = [];
                }
            });
        });

        this.settingApi.getAll().subscribe(res => {
            let item;
            console.log(res);
            item = res.find(item => item.key === 'introtext');
            this.introNews = item ? item.value : {};
        });
    }

    delete(news) {
        if (!confirm('Are you sure to delete')) {
            return;
        }

        this.api.deleteNews(news.id).subscribe(
            res => {
                this.news = this.news.filter(item => item.id != news.id);
                this.toasterService.popAsync('success', '', 'News has been deleted.');
            },
            res => {
                const error = JSON.parse(res._body);
                this.error =
          (error.error && error.error.message) || 'Sorry, something is wrong';

                this.toasterService.popAsync('error', '', this.error);
            }
        );
    }

    getRoleName(role) {
        return role.map(item => item.name).join(',');
    }

    updateTitleNews() {
        this.settingApi.updateSetting('introtext', this.introNews).subscribe(
            res => {
                this.toasterService.popAsync(
                    'success',
                    '',
                    'Introduction news has been updated.'
                );

                document.getElementById('collapse-trigger').click();
            },
            err => {
                this.toasterService.popAsync('error', '', 'Updation Failed.');
            }
        );
    }
}
