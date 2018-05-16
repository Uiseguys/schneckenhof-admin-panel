import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SharedModule } from 'shared/shared.module';
import { PackagingService } from 'pages/packaging/packaging.service';
import { WineService } from './wine.service';
import { WineForm } from './wineForm/wineForm';
import { WinePage } from './list/wine.page';
import { CreateWinePage } from './create/createWine.page';
import { EditWinePage } from './edit/editWine.page';

const routes: Routes = [
  { path: '', component: WinePage },
  {
    path: 'create',
    component: CreateWinePage
  },
  {
    path: ':id',
    component: EditWinePage
  }
];

@NgModule({
  imports: [SharedModule, RouterModule.forChild(routes)],
  declarations: [WineForm, WinePage, CreateWinePage, EditWinePage],
  providers: [WineService, PackagingService],
  exports: [RouterModule]
})
export class WineModule {}
