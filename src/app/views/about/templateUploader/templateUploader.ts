import {
  Component,
  EventEmitter,
  ElementRef,
  NgZone,
  Input,
  Output,
  OnInit
} from "@angular/core";
import { FileUploader } from "ng2-file-upload";

declare var $: any;

@Component({
  selector: "template-uploader",
  templateUrl: "./templateUploader.html"
})
export class TemplateUploader implements OnInit {
  token: string = "";
  uploader: FileUploader;
  elem: HTMLElement;

  @Input("url") url: string = "";
  @Input("title") title: string = "";
  @Input("mimeTypes") mimeTypes: any = [];
  @Input("limit") limit: Number = 1;
  @Input("validate") validate: any;

  @Output() onChange: EventEmitter<any> = new EventEmitter();

  constructor(elementRef: ElementRef, public zone: NgZone) {
    this.elem = elementRef.nativeElement;
  }

  ngOnInit() {
    this.uploader = new FileUploader({
      url: this.url
      // allowedMimeType: ["application/*", "text/*"]
    });

    this.uploader.onSuccessItem = (
      item: any,
      response: any,
      status: any,
      headers: any
    ) => {
      this.uploader.clearQueue();
      this.onChange.emit(JSON.parse(response));
    };

    this.uploader.onErrorItem = (
      item: any,
      response: any,
      status: any,
      headers: any
    ) => {
      alert("Sorry. file uploading failed");
      this.uploader.clearQueue();
    };

    this.uploader.onWhenAddingFileFailed = (item, filter) => {
      if (filter.name === "mimeType") {
        alert("Invalid file");
      }
    };

    this.uploader.onAfterAddingFile = file => {
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
  }

  selectFile() {
    $(this.elem)
      .find(".file")
      .trigger("click");
  }
}
