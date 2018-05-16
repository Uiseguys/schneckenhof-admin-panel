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
import { PackagingService } from 'pages/packaging/packaging.service';

@Component({
  selector: 'app-packaging-page',
  templateUrl: './packaging.page.html',
  styleUrls: [],
  encapsulation: ViewEncapsulation.None
})
export class PackagingPage implements OnInit {
  form: FormGroup;
  page = 1;
  packagings: any;

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
    private api: PackagingService,
    private modalService: BsModalService,
    private settings: SettingsService,
    private toasterService: ToasterService
  ) {
    this.form = fb.group({
      displayName: ['', Validators.compose([Validators.required])],
      measure: ['', Validators.compose([Validators.required])],
      unitOfMeasure: ['', Validators.compose([Validators.required])]
    });
  }

  ngOnInit() {
    this.route.queryParams.subscribe(queryParams => {
      // Defaults to 0 if no query param provided.
      const page = queryParams['page'] || 1;
      this.api.getPackagingCount().subscribe(res => {
        this.pageConfig.totalItems = res.count;
      });

      this.page = page;
      this.packagings = this.api.getPackagings(
        page,
        this.pageConfig.itemsPerPage
      );
      this.pageConfig.currentPage = page;
    });
  }

  loadPackages() {
    this.packagings = this.api.getPackagings(
      this.page,
      this.pageConfig.itemsPerPage
    );
  }

  getPackagings(page: number) {
    this.router.navigate(['/dashboard/packaging'], { queryParams: { page } });
  }

  showCreateModal(template) {
    this.form.reset();
    this.form.controls.unitOfMeasure.setValue('ml');
    this.selectedId = 0;
    this.modalRef = this.modalService.show(template);
  }

  showEditModal(template, packaging) {
    this.form.reset();
    this.form.controls.displayName.setValue(packaging.displayName);
    this.form.controls.measure.setValue(packaging.measure);
    this.form.controls.unitOfMeasure.setValue(packaging.unitOfMeasure);

    this.selectedId = packaging.id;
    this.modalRef = this.modalService.show(template);
  }

  deletePackaging(packaging) {
    if (!confirm('Are you sure to delete')) return;

    this.api.deletePackaging(packaging.id).subscribe(res => {
      this.toasterService.popAsync('success', '', 'Packaging has been deleted');
      this.loadPackages();
    });
  }

  handleSubmit($e) {
    $e.preventDefault();
    for (let c in this.form.controls) {
      this.form.controls[c].markAsTouched();
    }

    if (!this.form.valid) return;

    this.modalRef.hide();
    if (this.selectedId) {
      this.api
        .updatePackaging(this.selectedId, this.form.value)
        .subscribe(res => {
          this.toasterService.popAsync(
            'success',
            '',
            'Packaging has been updated'
          );
          this.loadPackages();
        });
    } else {
      this.api.createPackaging(this.form.value).subscribe(res => {
        this.toasterService.popAsync(
          'success',
          '',
          'Packaging has been created'
        );
        this.loadPackages();
      });
    }
  }
}
