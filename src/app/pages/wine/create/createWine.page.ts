import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToasterService } from 'angular2-toaster';

import { WineService } from '../wine.service';

@Component({
  selector: 'app-createWine-page',
  templateUrl: './createWine.page.html',
  styleUrls: ['./createWine.page.scss']
})
export class CreateWinePage implements OnInit {
  type = '';

  constructor(
    private route: ActivatedRoute,
    public router: Router,
    private toasterService: ToasterService,
    private api: WineService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.type = params.type;
    });
  }

  handleSubmit(values) {
    this.api
      .createWine({
        ...values,
        type: this.type
      })
      .subscribe(
        res => {
          this.toasterService.popAsync('success', '', 'Wine has been created');
          this.router.navigate(['/dashboard/' + this.type]);
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
