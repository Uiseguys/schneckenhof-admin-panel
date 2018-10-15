import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { ToasterService } from 'angular2-toaster';
import { Observable, Subject } from 'rxjs';
import { BsModalService } from 'ngx-bootstrap/modal';

import { SettingsService } from 'services/settings/settings.service';
import { ImageService } from 'pages/image/image.service';

@Component({
  selector: 'app-image-page',
  templateUrl: './image.page.html',
  styleUrls: [],
  encapsulation: ViewEncapsulation.None
})
export class ImagePage implements OnInit {
  form: FormGroup;
  page = 1;
  images: any;

  pageConfig = {
    itemsPerPage: 50,
    currentPage: 1,
    totalItems: 1
  };

  modalRef: any;
  selectedId = 0;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    public router: Router,
    private api: ImageService,
    private modalService: BsModalService,
    private settings: SettingsService,
    private toasterService: ToasterService
  ) {
    this.form = fb.group({
      displayName: [''],
      measure: ['', Validators.compose([Validators.required])],
      unitOfMeasure: ['', Validators.compose([Validators.required])]
    });
  }

  ngOnInit() {
    this.route.queryParams.subscribe(queryParams => {
      // Defaults to 0 if no query param provided.
      const page = queryParams['page'] || 1;
      this.api.getImageCount().subscribe(res => {
        this.pageConfig.totalItems = res.count;
      });

      this.page = page;
      this.images = this.api.getImages(
        page,
        this.pageConfig.itemsPerPage
      );
      this.pageConfig.currentPage = page;
    });
  }

  loadImages() {
    this.images = this.api.getImages(
      this.page,
      this.pageConfig.itemsPerPage
    );
  }

  getImages(page: number) {
    this.router.navigate(['/dashboard/images'], { queryParams: { page } });
  }

  deleteImage(image) {
    if (!confirm('Are you sure to delete')) return;

    this.api.deleteImage(image.id).subscribe(res => {
      this.toasterService.popAsync('success', '', 'Image has been deleted');
      this.loadImages();
    });
  }

  getImageUrl(url) {
    if (url) {
      return `${this.settings.API_URL}${url}`;
    }
    return '-';
  }

  refreshList($event) {
    this.toasterService.popAsync('success', '', 'Image has been uploaded');
    this.loadImages();
  }
}
