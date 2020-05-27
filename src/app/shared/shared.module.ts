import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { ModalModule } from 'ngx-bootstrap/modal';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { NgSelectModule } from '@ng-select/ng-select';
import { FileUploadModule } from 'ng2-file-upload';
import { ToasterModule } from 'angular2-toaster';
import { AttachUploader } from './attachUploader/attachUploader';
// import {
// CloudinaryModule,
// CloudinaryConfiguration
// } from '@cloudinary/angular-5.x';
// import { Cloudinary } from 'cloudinary-core';

import { SettingsService } from '../services/settings/settings.service';
import { Api } from '../services/api/api.service';
import { ClientApiService } from '../services/api/clientapi.service';
import { AuthGuardResolve } from '../services/authguard/authguard.service';
import { I18NextFormatPipe } from './pipes/i18next.pipe';

// https://angular.io/styleguide#!#04-10
@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        NgxPaginationModule,
        NgSelectModule,
        FileUploadModule,
        CollapseModule.forRoot(),
        ModalModule.forRoot(),
        BsDropdownModule.forRoot(),
        TooltipModule.forRoot(),
        // CloudinaryModule.forRoot({ Cloudinary }, {
        // cloud_name: 'schneckenhof',
        // secure: true
        // } as CloudinaryConfiguration),
        ToasterModule
    ],
    providers: [AuthGuardResolve],
    declarations: [I18NextFormatPipe, AttachUploader],
    exports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        NgxPaginationModule,
        NgSelectModule,
        FileUploadModule,
        ModalModule,
        TooltipModule,
        CollapseModule,
        BsDropdownModule,
        ToasterModule,
        AttachUploader,
        I18NextFormatPipe
    ]
})

// https://github.com/ocombe/ng2-translate/issues/209
export class SharedModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: SharedModule,
            providers: [SettingsService, Api, ClientApiService]
        };
    }
}
