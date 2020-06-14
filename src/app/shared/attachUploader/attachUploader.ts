import {
    Component,
    ViewChild,
    EventEmitter,
    ElementRef,
    NgZone,
    Input,
    Output,
    OnInit,
    ViewEncapsulation
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
    FileUploader,
    FileUploaderOptions,
    ParsedResponseHeaders
} from 'ng2-file-upload';
import { uniqBy } from 'lodash';
import { SettingsService } from '../../services/settings/settings.service';

declare let $: any;

@Component({
    selector: 'attach-uploader',
    templateUrl: './attachUploader.html',
    styleUrls: ['./attachUploader.scss'],
    encapsulation: ViewEncapsulation.None
})
export class AttachUploader implements OnInit {
    uploader: FileUploader;
    elem: HTMLElement;

    @Input()
    mimeTypes: any = [];
    validate: any;
    responses: Array<any>;

    @Output() onChange: EventEmitter<any> = new EventEmitter();

    constructor(
        elementRef: ElementRef,
        private route: ActivatedRoute,
        private settings: SettingsService,
        public zone: NgZone
    ) {
        this.responses = [];
    }

    ngOnInit() {
        this.uploader = new FileUploader({
            url: this.settings.API_URL,
            disableMultipart: false,
            method: 'post',
            authToken: this.settings.getStorage('token'),
            allowedMimeType: this.mimeTypes
        });

        this.uploader.onSuccessItem = (
            item: any,
            response: any,
            status: any,
            headers: any
        ) => {
            this.uploader.clearQueue();
            const result = JSON.parse(response);
            // result.weblinkUrl = this.settings.API_URL + response.weblinkUrl;
            this.onChange.emit(result);
        };

        this.uploader.onErrorItem = (
            item: any,
            response: any,
            status: any,
            headers: any
        ) => {
            console.log(response);
            alert('Sorry. file uploading failed');
            this.uploader.clearQueue();
        };

        this.uploader.onWhenAddingFileFailed = (item, filter) => {
            if (filter.name === 'mimeType') {
                alert('Invalid file');
            }
        };
        this.uploader.onAfterAddingFile = file => {
            file.withCredentials = false;
            if (this.validate) {
                this.validate(file).then(
                    () => {
                        this.zone.run(() => {
                            this.uploader.uploadAll();
                        });
                    },
                    () => {
                        this.zone.run(() => {
                            this.uploader.clearQueue();
                        });
                    }
                );
            } else {
                this.uploader.uploadAll();
            }
        };

        this.route.params.subscribe(params => {
            this.uploader.setOptions({
                // url: this.settings.API_URL + `/resources/${params.type}/upload`,
                url: this.settings.API_URL + '/resources/upload',
                authToken: this.settings.getStorage('token'),
                allowedMimeType: this.mimeTypes
            });
        });
    }

    selectFile() {
        $('#file').trigger('click');
    }
}
