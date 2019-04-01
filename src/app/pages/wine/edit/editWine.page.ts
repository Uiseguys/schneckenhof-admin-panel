import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToasterService } from 'angular2-toaster';

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
    private toasterService: ToasterService,
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
      .updateWine(this.wine.id, {
        ...this.wine,
        ...values
      })
      .subscribe(
        res => {
          this.toasterService.popAsync('success', '', 'Wine has been updated');
          this.router.navigate(['/dashboard/' + this.wine.type]);
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
