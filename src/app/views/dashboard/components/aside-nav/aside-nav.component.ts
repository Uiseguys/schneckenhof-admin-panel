import { Component, OnInit } from '@angular/core';
// import { Store } from '@angular-redux/store';
import { dispatch, select } from '@angular-redux/store';

@Component({
  selector: 'app-aside-nav',
  templateUrl: './aside-nav.component.html',
  styleUrls: ['./aside-nav.component.scss']
})

export class AsideNavComponent implements OnInit {

  @select() location;
  @select(['dashboard', 'userData']) USERDATA;
  currentPath: string;
  userData: any = { firstName : '' , lastName : ''};
  userInitial: string;
  activeState: String = 'DASHBOARD'; // Set default menu active on load
  constructor() {
  }

  ngOnInit() {
    this.location.subscribe((location) => {
      console.log('location in subscription:');
      console.log(location);
      this.currentPath = location.type;
      this.activeState = this.currentPath && this.currentPath.replace('app/navigation/', '');
    });
    this.USERDATA.subscribe((USERDATA) => {
       this.userData = USERDATA;
       if (this.userData && this.userData.firstName) {
          this.userInitial = this.userData.firstName && this.userData.firstName.charAt(0).toUpperCase();
          this.userInitial += this.userData.lastName && this.userData.lastName.charAt(0).toUpperCase();
       }
    });
  }

  setActiveState(state: String) {
    this.activeState = state;
  }

}
