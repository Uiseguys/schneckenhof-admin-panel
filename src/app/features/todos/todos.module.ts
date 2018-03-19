import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Select2Module } from 'ng2-select2';

import { StoreModule } from '../../shared/store/store.module';
import { HttpClientModule } from '@angular/common/http';
import { NavigationModule } from '../../shared/navigation/navigation.module';
import { ToDoActions } from './api/actions';
import { SharedModule } from '../../shared/shared.module';
import { PlaylistCollectionComponent } from './collection/collection.component';
import { PlaylistDetailComponent } from './detail/detail.component';
import { TodoFormComponent } from './form/form.component';
import { TodoCreateComponent } from './create/create.component';

import { SearchComponent } from './search/search.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    Select2Module,

    StoreModule,
    HttpClientModule,
    NavigationModule,
    SharedModule
  ],
  declarations: [
    PlaylistCollectionComponent,
    PlaylistDetailComponent,
    TodoFormComponent,
    TodoCreateComponent,

    SearchComponent
  ],
  providers: [ToDoActions],
  exports: [
    PlaylistDetailComponent,
    PlaylistCollectionComponent,
    TodoFormComponent,
    TodoCreateComponent,

    SearchComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ToDosModule {}
