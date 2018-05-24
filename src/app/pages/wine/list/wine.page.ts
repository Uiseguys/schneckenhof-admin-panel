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

  wines: any;
  error = '';

  constructor(
    private route: ActivatedRoute,
    public router: Router,
    private api: WineService,
    private settings: SettingsService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.type = params.type;

      this.api.getWines(this.type).subscribe(res => {
        this.wines = res;
      });
    });
  }

  deleteWine(wine) {
    if (!confirm('Are you sure to delete')) {
      return;
    }

    this.api.deleteWine(wine.id).subscribe(
      res => {
        this.wines = this.wines.filter(item => item.id != wine.id);
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
