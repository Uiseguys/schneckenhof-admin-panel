import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SharedModule } from 'shared/shared.module';
import { WineService } from '../wine/wine.service';
import { TemplateService } from './template.service';
import { TemplatePage } from './list/template.page';

const routes: Routes = [{ path: '', component: TemplatePage }];

@NgModule({
  imports: [SharedModule, RouterModule.forChild(routes)],
  declarations: [TemplatePage],
  providers: [WineService, TemplateService],
  exports: [RouterModule]
})
export class TemplateModule {}
