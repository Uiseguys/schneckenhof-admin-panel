import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LinkComponent } from './components/link/navigation.component';
import { NavigationObservers } from './api/observer';

@NgModule({
  imports: [ CommonModule ],
  declarations: [ LinkComponent ],
  providers: [ NavigationObservers ],
  exports: [ LinkComponent ]
})
export class NavigationModule {}
