import { Component, HostListener, Input } from '@angular/core';

import { dispatch } from '@angular-redux/store';

@Component({
  selector: 'app-link',
  templateUrl: './link.component.html',
  styleUrls: ['./link.component.scss']
})
export class LinkComponent {
  @Input('target') target;

  @dispatch() navigate = (target) => (target);

  @HostListener('click')
  go() {
    const actionName = 'app/navigation/' + this.target;
    this.navigate({type: actionName});
  }
}
