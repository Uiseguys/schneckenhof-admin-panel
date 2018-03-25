import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, Subject } from 'rxjs';

import { SettingsService } from 'services/settings/settings.service';
import { WineService } from 'pages/wine/wine.service';

@Component({
  selector: 'app-wine-page',
  templateUrl: './wine.page.html',
  styleUrls: ['./wine.page.scss'],
  encapsulation: ViewEncapsulation.None
})
export class WinePage implements OnInit {
  type = '';

  page = 1;
  wines: any;
  error = '';

  pageConfig = {
    itemsPerPage: 20,
    currentPage: 1,
    totalItems: 1
  };

  constructor(
    private route: ActivatedRoute,
    public router: Router,
    private api: WineService,
    private settings: SettingsService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.type = params.type;
      this.route.queryParams.subscribe(queryParams => {
        // Defaults to 0 if no query param provided.
        const page = queryParams['page'] || 1;
        this.api.getWineCount(this.type).subscribe(res => {
          this.pageConfig.totalItems = res.count;
        });

        this.page = page;
        this.wines = this.api.getWines(
          this.type,
          page,
          this.pageConfig.itemsPerPage
        );
        this.pageConfig.currentPage = page;
      });
    });
  }

  getWines(page: number) {
    this.router.navigate(['/dashboard/wines'], { queryParams: { page } });
  }

  deleteWine(wine) {
    if (!confirm('Are you sure to delete')) {
      return;
    }

    this.api.deleteWine(wine.id).subscribe(
      res => {
        this.pageConfig.totalItems =
          this.pageConfig.totalItems > 1 ? this.pageConfig.totalItems - 1 : 0;

        this.wines = this.api.getWines(
          this.type,
          this.page,
          this.pageConfig.itemsPerPage
        );
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
