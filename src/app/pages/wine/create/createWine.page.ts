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
    if(parseInt(values.availability)){
      values.availability = true
    }else{
      values.availability = false
    }
    if(parseInt(values.premium)){
      values.premium = true
    }else{
      values.premium = false
    }
    if(values.content){
      values.content = 1
    }else{
      values.content = 0
    }
    if(!values.description){
      values.description = ""
    }
    if(!values.no){
      values.no = 0
    }

    values.packagingId = parseInt(values.packagingId);
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
