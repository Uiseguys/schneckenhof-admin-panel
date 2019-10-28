import { Component, OnInit, ViewEncapsulation, OnDestroy } from '@angular/core';
import { ToasterService } from 'angular2-toaster';

import { ClientApiService } from '../../../services/api/clientapi.service';
import { SettingsService as ConfigService } from '../../../services/settings/settings.service';
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
  emailSetting: any = {};
  newsletterSetting: any = {};


  hook: any = null;
  timer: any = null;

  constructor(
    private api: SettingService,
    private config: ConfigService,
    private toasterService: ToasterService
  ) {}

  ngOnInit() {
    this.api.getAll().subscribe(res => {
      let item;
      item = res.find(item => item.key === 'settings');
      this.settings = item ? item.value : {};

      item = res.find(item => item.key === 'email');
      this.emailSetting = item ? item.value : {};

      item = res.find(item => item.key === "newsletter");
      this.newsletterSetting = item ? item.value : {};
    });
  }

  ngOnDestroy() {}

  updateNetlifySetting() {
    this.api.updateSetting('settings', this.settings).subscribe(res => {
      this.toasterService.popAsync(
        'success',
        '',
        'Netlify Settings have been updated'
      );
      this.config.setAppSetting('settings', this.settings);
    });
  }

  updateEmailSetting() {
    this.api.updateSetting('email', this.emailSetting).subscribe(res => {
      this.toasterService.popAsync(
        'success',
        '',
        'Email addresses have been updated'
      );
      this.config.setAppSetting('email', this.emailSetting);
    });
  }

  updateNewsletterSetting() {
    this.api
      .updateSetting("newsletter", this.newsletterSetting)
      .subscribe(res => {
        this.toasterService.popAsync(
          "success",
          "",
          "Newsletter Settings have been updated"
        );
        this.config.setAppSetting("newsletter", this.newsletterSetting);
      });
  }

}
