import { Component, OnInit, ViewEncapsulation, OnDestroy } from '@angular/core';
import { ToasterService } from 'angular2-toaster';

import { ClientApiService } from 'services/api/clientapi.service';
import { SettingsService as ConfigService } from 'services/settings/settings.service';
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
    private api: SettingService,
    private config: ConfigService,
    private toasterService: ToasterService
  ) {}

  ngOnInit() {
    this.api.getAll().subscribe(res => {
      const item = res.find(item => item.key === 'settings');
      this.settings = item ? item.value : {};
    });
  }

  ngOnDestroy() {}

  handleSubmit($e) {
    $e.preventDefault();

    this.api.updateSetting('settings', this.settings).subscribe(res => {
      this.toasterService.popAsync('success', '', 'Settings have been updated');
      this.config.setAppSetting('settings', this.settings);
    });
  }
}
