import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SharedModule } from '../../shared/shared.module';
import { PackagingService } from './packaging.service';
import { PackagingPage } from './list/packaging.page';

const routes: Routes = [{ path: '', component: PackagingPage }];

@NgModule({
  imports: [SharedModule, RouterModule.forChild(routes)],
  declarations: [PackagingPage],
  providers: [PackagingService],
  exports: [RouterModule]
})
export class PackagingModule {}
