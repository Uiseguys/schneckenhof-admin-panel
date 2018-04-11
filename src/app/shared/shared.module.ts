import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { ModalModule } from 'ngx-bootstrap/modal';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { SelectModule } from 'ng2-select';
import { FileUploadModule } from 'ng2-file-upload';
import { I18NextModule } from 'angular-i18next';
import { ToasterModule, ToasterService } from 'angular2-toaster';

import { AttachUploader } from './attachUploader/attachUploader';
import { ServicesModule } from '../services/services.module';

import { I18NextFormatPipe } from './pipes/i18next.pipe';

// https://angular.io/styleguide#!#04-10
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    NgxPaginationModule,
    SelectModule,
    FileUploadModule,
    CollapseModule.forRoot(),
    ModalModule.forRoot(),
    BsDropdownModule.forRoot(),
    TooltipModule.forRoot(),
    ServicesModule
  ],
  providers: [ToasterService],
  declarations: [I18NextFormatPipe, AttachUploader],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    NgxPaginationModule,
    SelectModule,
    FileUploadModule,
    ModalModule,
    TooltipModule,
    CollapseModule,
    BsDropdownModule,
    ToasterModule,
    ServicesModule,
    AttachUploader,
    I18NextFormatPipe
  ]
})

// https://github.com/ocombe/ng2-translate/issues/209
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule
    };
  }
}
