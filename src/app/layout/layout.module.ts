import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToasterModule, ToasterService } from 'angular2-toaster';

import { DashboardLayoutComponent } from './dashboardlayout/dashboardlayout.component';
import { ServicesModule } from '../services/services.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ServicesModule,
    BrowserAnimationsModule,
    ToasterModule
  ],
  providers: [ToasterService],
  declarations: [DashboardLayoutComponent],
  exports: [DashboardLayoutComponent, ToasterModule]
})
export class LayoutModule {}
