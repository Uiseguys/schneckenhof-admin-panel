import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatusComponent } from './components/status/status.component';
import { EnvironmentObservers } from './api/observer';
import { EnvironmentActions } from './api/actions';

@NgModule({
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  imports: [ CommonModule ],
  declarations: [ StatusComponent ],
  providers: [ EnvironmentObservers, EnvironmentActions ],
  exports: [ StatusComponent ]
})
export class StatusModule {}
