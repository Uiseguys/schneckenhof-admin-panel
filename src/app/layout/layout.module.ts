import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { SharedModule } from 'shared/shared.module';
import { DashboardLayoutComponent } from './dashboardlayout/dashboardlayout.component';
import { WineService } from '../pages/wine/wine.service';

@NgModule({
  imports: [CommonModule, RouterModule, BrowserAnimationsModule, SharedModule],
  providers: [WineService],
  declarations: [DashboardLayoutComponent],
  exports: [DashboardLayoutComponent, SharedModule]
})
export class LayoutModule {}
