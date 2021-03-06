import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { PackagingService } from '../../pages/packaging/packaging.service';
import { ImageService } from '../../pages/image/image.service';
import { SettingsService } from '../../services/settings/settings.service';
import { NewsService } from './news.service';
import { NewsForm } from './newsForm/newsForm';
import { NewsPage } from './list/news.page';
import { CreateNewsPage } from './create/createNews.page';
import { EditNewsPage } from './edit/editNews.page';
import { NgxEditorModule } from 'ngx-editor';
import { HttpClientModule, HttpClient } from '@angular/common/http';

const routes: Routes = [
  { path: '', component: NewsPage },
  {
    path: 'create',
    component: CreateNewsPage
  },
  {
    path: ':id',
    component: EditNewsPage
  }
];

@NgModule({
  imports: [SharedModule, RouterModule.forChild(routes),NgxEditorModule,HttpClientModule],
  declarations: [NewsForm, NewsPage, CreateNewsPage, EditNewsPage],
  providers: [NewsService, PackagingService, ImageService, SettingsService,HttpClientModule],
  exports: [RouterModule]
})
export class NewsModule {}
