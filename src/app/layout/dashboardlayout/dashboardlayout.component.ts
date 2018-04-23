import {
  Component,
  Inject,
  OnInit,
  OnDestroy,
  ViewEncapsulation
} from '@angular/core';
import { Router } from '@angular/router';
import { ToasterConfig } from 'angular2-toaster';

import { SettingsService } from '../../services/settings/settings.service';
import { ClientApiService } from '../../services/api/clientapi.service';
import { WineService } from '../../pages/wine/wine.service';
declare var $: any;

@Component({
  selector: 'app-dashboardlayout',
  templateUrl: './dashboardlayout.component.html',
  styleUrls: ['./dashboardlayout.component.scss']
})
export class DashboardLayoutComponent implements OnInit, OnDestroy {
  user = { email: '', roles: [] };
  lang = '';
  toasterconfig = new ToasterConfig({
    showCloseButton: false,
    tapToDismiss: false,
    timeout: 2000
  });

  constructor(
    private router: Router,
    private settings: SettingsService,
    private api: ClientApiService,
    private wineApi: WineService
  ) {
    this.user = settings.getAppSetting('user');
    this.lang = localStorage.getItem('stanapplang') || 'de';
  }

  ngOnInit() {}

  ngOnDestroy() {}

  logout($event) {
    $event.preventDefault();
    this.api.logout().subscribe(() => {
      this.settings.clearSetting();
      this.router.navigate(['/home']);
    });
  }

  changeLanguage(lang) {
    this.lang = lang;
    localStorage.setItem('stanapplang', lang);
    document.location.reload();
  }

  export($e) {
    $e.preventDefault();

    this.wineApi.getAll().subscribe(wines => {
      const groupedWines = {
        red: { normal: [], little: [], premium: [] },
        white: { normal: [], little: [], premium: [] },
        rose: { normal: [], little: [], premium: [] },
        champagne: { normal: [], little: [], premium: [] }
      };
      // calculate prices again
      wines.forEach(wine => {
        if (!groupedWines[wine.type]) return;

        wine.no = wine.no || '';
        wine.price = wine.price && wine.price.toFixed(2);
        if (wine.alcohol) {
          wine.alcohol += ' %';
        }
        if (wine.content == 0.75) {
          wine.price1 = wine.price;
          wine.price = (wine.price * 100 / 75).toFixed(2);
        }

        if (wine.premium) {
          groupedWines[wine.type].premium.push(wine);
        } else if (wine.content == 0.75) {
          groupedWines[wine.type].little.push(wine);
        } else {
          groupedWines[wine.type].normal.push(wine);
        }
      });

      this.api.generatePDF('wine_menu2.fodt', groupedWines).subscribe(res => {
        var win = window.open(res, '_blank');
      });
    });
  }
}
