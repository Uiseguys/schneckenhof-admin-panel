import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { StoreModule } from '../../shared/store/store.module';
import { SharedModule } from '../../shared/shared.module';
import { DiagnosticsComponent } from './diagnostics.component';
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
    DiagnosticsComponent,
  ],
  providers: [

  ],
  exports: [
    DiagnosticsComponent,
  ]
})
export class DiagnosticsModule {}
