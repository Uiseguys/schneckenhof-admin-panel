import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { StoreModule } from '../../shared/store/store.module';
import { SharedModule } from '../../shared/shared.module';
import { UIShowcaseComponent } from './ui-showcase.component';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    StoreModule,
    SharedModule,
    HttpClientModule,
    NgbModule,
    FormsModule
  ],
  declarations: [
    UIShowcaseComponent,
  ],
  providers: [

  ],
  exports: [
    UIShowcaseComponent,
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class UIShowcaseModule {}
