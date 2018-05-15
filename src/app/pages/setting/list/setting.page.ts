import { Component, OnInit, ViewEncapsulation, OnDestroy } from '@angular/core';
import { Http } from '@angular/http';
import { ToasterService } from 'angular2-toaster';

import { ClientApiService } from 'services/api/clientapi.service';
import { SettingService } from '../setting.service';

declare var $: any;

@Component({
  selector: 'app-setting-page',
  templateUrl: './setting.page.html',
  styleUrls: ['./setting.page.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SettingPage implements OnInit, OnDestroy {
  settings: any = {
    netlifySiteID: ''
  };
  hook: any = null;
  timer: any = null;

  constructor(
    public http: Http,
    private api: SettingService,
    private toasterService: ToasterService
  ) {}

  ngOnInit() {
    this.api.getAll().subscribe(res => {
      const item = res.find(item => item.key === 'settings');
      this.settings = item ? item.value : {};

      const hook = res.find(item => item.key === 'netlifyHook');
      if (hook && hook.value.state === 'building') {
        this.startWatch();
      }
      this.hook = hook;
    });
  }

  ngOnDestroy() {
    this.stopWatch();
  }

  handleSubmit($e) {
    $e.preventDefault();

    this.api.updateSetting('settings', this.settings).subscribe(res => {
      this.toasterService.popAsync('success', '', 'Settings have been updated');
    });
  }

  startWatch() {
    if (this.timer) return;
    this.timer = setInterval(() => {
      this.api.getSetting('netlifyHook').subscribe(res => {
        if (!res.length) return;

        const detail = res[0].value;
        if (detail.state === 'ready') {
          this.stopWatch();
          window.open(detail.deploy_ssl_url, '_blank');
        } else if (detail.state === 'failed') {
          this.stopWatch();
          this.toasterService.popAsync(
            'error',
            '',
            'Sorry. Building has been failed'
          );
        }
      });
    }, 3500);
  }

  stopWatch() {
    if (!this.timer) return;

    clearInterval(this.timer);
    this.timer = null;
  }

  triggerHook(url, isLive) {
    if (!url) {
      this.toasterService.popAsync('error', '', 'Web Hook url is required');
      return;
    }

    if (
      isLive &&
      !confirm('The changes will be deployed to live site. Are you sure?')
    ) {
      return;
    }

    this.http.post(url, {}).subscribe(
      res => {
        this.startWatch();
      },
      err => {
        this.toasterService.popAsync('error', '', 'Sorry. Something is wrong');
      }
    );
  }
}
