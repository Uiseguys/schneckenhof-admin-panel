import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { FileUploader } from 'ng2-file-upload';

import { SettingsService } from '../../../services/settings/settings.service';
import { TemplateService } from '../../../pages/template/template.service';
import { WineService } from '../../../pages/wine/wine.service';
import { environment as ENV } from '../../../../environments/environment';

declare var $: any;

@Component({
  selector: 'app-template-page',
  templateUrl: './template.page.html',
  styleUrls: ['./template.page.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TemplatePage implements OnInit {
  templates = [];
  uploader: FileUploader;
  @Input('mimeTypes') mimeTypes: any = ["image/jpeg"];

  constructor(
    private route: ActivatedRoute,
    public router: Router,
    private api: TemplateService,
    private wineApi: WineService,
    private settings: SettingsService
  ) { }

  ngOnInit() {
    this.uploader = new FileUploader({
      url: ENV.pdfUrl + "/Templates/",
      authToken: this.settings.getStorage('userId')
    });

    this.uploader.onSuccessItem = (
      item: any,
      response: any,
      status: any,
      headers: any
    ) => {
      this.uploader.clearQueue();
      this.templates.push(JSON.parse(response));
    };

    this.uploader.onErrorItem = (
      item: any,
      response: any,
      status: any,
      headers: any
    ) => {
      alert('Sorry. file uploading failed');
      this.uploader.clearQueue();
    };

    this.uploader.onWhenAddingFileFailed = (item, filter) => {
      console.log(item)
      console.log(filter)
      if (filter.name === 'mimeType') {
        alert('Invalid file');
      }
    };

    this.uploader.onAfterAddingFile = file => {
      file.withCredentials = false;
      this.uploader.uploadAll();
    };

    // get templates
    this.api.get('/Templates').subscribe(res => {
      let userId= this.settings.getStorage('userId');
      this.templates = res.filter(temp=> temp.ownerId === userId )
    });
  }

  downloadTemplate(template) {
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

      this.api.downloadTemplate(`${ENV.pdfUrl}/Templates/${template.id}`, JSON.stringify(groupedWines), this.settings.getStorage('userId')).subscribe(res => {
        window.open("https://" +res, '_blank')
      })

    });
  }

  deleteTemplate(template) {
    if (!confirm('Are you sure to delete')) return;

    this.api.deleteTemplate(template.id).subscribe(res => {
      this.templates = this.templates.filter(item => item.id != template.id);
    });
  }

  selectFile() {
    $('#templateFile').trigger('click');
  }
}
