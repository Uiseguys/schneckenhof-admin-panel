import {
  Component,
  EventEmitter,
  Input,
  Output,
  OnInit,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';

import { PackagingService } from '../../../pages/packaging/packaging.service';
import { ImageService } from '../../../pages/image/image.service';
import { SettingsService } from '../../../services/settings/settings.service';

import { BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'newsForm',
  templateUrl: './newsForm.html'
})
export class NewsForm implements OnInit, OnChanges {
  form: FormGroup;
  error = '';
  image = '';
  packagings = [];
  images = [];
  description = '';
  modalRef: any;

  @Input('isCreate') isCreate: boolean = true;
  @Input('initialValue') initialValue: any = {};

  @Output() onSubmit: EventEmitter<any> = new EventEmitter();

  constructor(
    private fb: FormBuilder,
    private packagingApi: PackagingService,
    private imageApi: ImageService,
    private modalService: BsModalService,
    private settings: SettingsService
  ) {
    this.form = fb.group({
      relevantFrom: ['', Validators.compose([Validators.required])],
      relevantTo: ['',Validators.compose([Validators.required])],
      title: ['', Validators.compose([Validators.required])],
      shortDescription: [''],
      description: [''],
      startDate: ['',Validators.compose([Validators.required])],
      endDate: ['',Validators.compose([Validators.required])]
    });

  }

  ngOnInit() {
  }

  formatNumber(n){
    return n > 9 ? "" + n: "0" + n;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (
      changes.initialValue &&
      changes.initialValue.previousValue &&
      changes.initialValue.previousValue.id !== this.initialValue.id
    ) {
      Object.keys(this.form.controls).forEach(key => {
        if(key === "relevantFrom"){
          let date = new Date(this.initialValue[key]);
          this.form.controls[key].setValue(date.getUTCFullYear()+"-"+this.formatNumber(date.getMonth()+1)+"-"+this.formatNumber(date.getUTCDate()));
        }else if(key === "relevantTo") {
          let date = new Date(this.initialValue[key]);
          this.form.controls[key].setValue(date.getUTCFullYear()+"-"+this.formatNumber(date.getMonth()+1)+"-"+this.formatNumber(date.getUTCDate()));
        }else if(key === "startDate") {
          let date = new Date(this.initialValue[key]);
          this.form.controls[key].setValue(date.getUTCFullYear()+"-"+this.formatNumber(date.getMonth()+1)+"-"+this.formatNumber(date.getUTCDate()));
        }else if(key === "endDate") {
          let date = new Date(this.initialValue[key]);
          this.form.controls[key].setValue(date.getUTCFullYear()+"-"+this.formatNumber(date.getMonth()+1)+"-"+this.formatNumber(date.getUTCDate()));
        }else if(key === "description"){
            this.description = this.initialValue[key]
        }else{
          this.form.controls[key].setValue(this.initialValue[key]);
        }
      });
    }
  }

  handleSubmit($event) {
    $event.preventDefault();
    this.form.value.description = this.description;
    for (let c in this.form.controls) {
      this.form.controls[c].markAsTouched();
    }
    if (this.form.value.vintage === "") {
      this.form.value.vintage = 0
    }
    if (!this.form.valid) return;
    this.onSubmit.emit({
      ...this.form.value
    });
  }

  
  copy(){
     this.form.value.description = this.description
     localStorage.setItem('newsformdata',JSON.stringify(this.form.value));
  }

  paste(){
    if(localStorage.getItem('newsformdata')){
       let data = JSON.parse(localStorage.getItem('newsformdata'));
       this.form.controls.relevantFrom.setValue(data.relevantFrom);
       this.form.controls.relevantTo.setValue(data.relevantTo);
       this.form.controls.title.setValue(data.title);
       this.form.controls.shortDescription.setValue(data.shortDescription);
       this.description = data.description;
       this.form.controls.startDate.setValue(data.startDate);
       this.form.controls.endDate.setValue(data.endDate);
       localStorage.removeItem('newsformdata');
    }
     
  }
}
