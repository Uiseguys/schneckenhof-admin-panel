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

import { PackagingService } from 'pages/packaging/packaging.service';
import { ImageService } from 'pages/image/image.service';
import { SettingsService } from 'services/settings/settings.service';

import { BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'wineForm',
  templateUrl: './wineForm.html'
})
export class WineForm implements OnInit, OnChanges {
  form: FormGroup;
  error = '';
  image = '';
  packagings = [];
  images = [];

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
      name: ['', Validators.compose([Validators.required])],
      vintage: [''],
      price: ['', Validators.compose([Validators.required])],
      awardText: [''],
      awardLevel: [''],
      availability: [''],
      content: [''],
      packagingId: [''],
      varietal: [''],
      premium: [''],
      priority: [''],
      no: [''],
      alcohol: [''],
      description: ['']
    });

    this.form.controls.availability.setValue(1);
    this.form.controls.premium.setValue(1);
    this.form.controls.priority.setValue(0);
  }

  ngOnInit() {
    this.packagingApi.getPackagings().subscribe(res => {
      this.packagings = res;
    });
    this.imageApi.getAllImages().subscribe(res => {
      this.images = res;
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (
      changes.initialValue &&
      changes.initialValue.previousValue &&
      changes.initialValue.previousValue.id !== this.initialValue.id
    ) {
      Object.keys(this.form.controls).forEach(key => {
        if (this.initialValue[key] === true) {
          this.form.controls[key].setValue(1);
        } else if (this.initialValue[key] === false) {
          this.form.controls[key].setValue(0);
        } else {
          this.form.controls[key].setValue(this.initialValue[key]);
        }
      });
      this.image = this.initialValue.image;
    }
  }

  handleSubmit($event) {
    $event.preventDefault();

    for (let c in this.form.controls) {
      this.form.controls[c].markAsTouched();
    }

    if (!this.form.valid) return;

    this.onSubmit.emit({
      ...this.form.value,
      image: this.image
    });
  }

  setImage(file) {
    this.image = file.weblinkUrl;
  }

  showImageSelectModal(template) {
    this.modalRef = this.modalService.show(template);
  }

  selectImage(url, $event) {
    $event.preventDefault();
    this.image = `${this.settings.API_URL}${url}`;
    this.modalRef.hide();
  }

  getImageUrl(url) {
    if (url) {
      return `${this.settings.API_URL}${url}`;
    }
    return '-';
  }
}
