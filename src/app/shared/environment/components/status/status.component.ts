import { Component, NgZone } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { EnvironmentActions } from '../../api/actions';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';

import device from 'current-device';

declare var window;

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.scss']
})
export class StatusComponent {
  isConnected: Observable<boolean>;
  isDismiss: boolean;
  isOverlay: boolean;
  overlayMsg: string;

  constructor(private ngZone: NgZone, private dispatcher: EnvironmentActions) {
    this.isConnected = Observable.merge(
      Observable.of(navigator.onLine),
      Observable.fromEvent(window, 'online').map(() => true),
      Observable.fromEvent(window, 'offline').map(() => false));
    this.isConnected.subscribe((flag) => {
      this.dispatcher.isConnected(flag);
      this.isDismiss = !flag;
    });

    window.onresize = (e) => {
      this.ngZone.run(() => {
        this.currentResolution(window.innerWidth, window.innerHeight);
      });
    };
    this.checkDevice();
    this.currentResolution(window.innerWidth, window.innerHeight);
  }

  onToggleVisibility(event: CustomEvent) {
    console.log(event);
    this.isDismiss = !event;
  }

  checkDevice() {

    const deviceSettings = device;

    if (deviceSettings.mobile()) {
      this.dispatcher.uaIsMobile(true);
      this.isOverlay = true;
      this.overlayMsg = 'Mobile devices are not supported!';
      return;
    }

    deviceSettings.onChangeOrientation(newOrientation => {
      if (deviceSettings.tablet() && newOrientation === 'portrait') {
        this.dispatcher.uaIsTabletPortrait(true);
        this.isOverlay = true;
        this.overlayMsg = 'Please rotate to landscape mode!';
      }
      if (deviceSettings.tablet() && newOrientation === 'landscape') {
        this.dispatcher.uaIsTabletPortrait(false);
        this.isOverlay = false;
        this.overlayMsg = '';
      }
    });
  }

  currentResolution(w: number, h: number) {
    console.log(`${w}x${h}`);
    this.dispatcher.uaCurrentResolution(`${w}x${h}`);
  }
}
