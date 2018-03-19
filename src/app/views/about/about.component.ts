import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import * as storage from "../../utils/storage";

@Component({
  selector: "app-about",
  templateUrl: "./about.component.html",
  styleUrls: ["./about.component.scss"]
})
export class AboutComponent implements OnInit {
  apiUrl = "http://18.196.130.198:4000/api/Templates/";
  buildVersion: string;
  content: any = "";

  template: any = {
    id: ""
  };
  constructor(private http: HttpClient) {
    this.http
      .get("assets/CHANGELOG.md", { responseType: "text" })
      .subscribe(res => {
        // remove all links
        const patt = /\(http[^)]*\)/gi;
        this.content = res.toString().replace(patt, "");
      });
    this.template = storage.getItem("template", {});
  }

  ngOnInit() {
    console.log("AboutComponent initialized.");
    this.buildVersion = environment.version;
  }

  setTemplate(template) {
    this.template = template;
    storage.setItem("template", template);
  }

  downloadTemplate() {
    $("#title").val("About Us");
    $("#content").val($("cwc-markdown").text());
    $("#templateForm").submit();
  }
}
