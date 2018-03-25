import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { WineService } from '../wine.service';

@Component({
  selector: 'app-editWine-page',
  templateUrl: './editWine.page.html',
  styleUrls: ['./editWine.page.scss']
})
export class EditWinePage implements OnInit {
  error = '';
  wine: any = {};

  constructor(
    private route: ActivatedRoute,
    public router: Router,
    private api: WineService
  ) {
    this.route.params.subscribe(params => {
      this.api.getWine(params.id).subscribe(res => {
        this.wine = res;
      });
    });
  }

  ngOnInit() {}

  handleSubmit(values) {
    this.api
      .updateWine(this.wine.id, {
        ...this.wine,
        ...values
      })
      .subscribe(
        res => {
          this.router.navigate(['/dashboard/' + this.wine.type]);
        },
        res => {
          const error = JSON.parse(res._body);
          this.error =
            (error.error && error.error.message) || 'Sorry, something is wrong';
        }
      );
  }
}