import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { TagInputModule } from "ngx-chips";
import { FileUploadModule } from "ng2-file-upload";

import { DashboardModule } from "./dashboard/dashboard.module";
import { DiagnosticsModule } from "./diagnostics/diagnostics.module";
import { AboutComponent } from "./about/about.component";
import { TemplateUploader } from "./about/templateUploader/templateUploader";

import { LocalSettingsComponent } from "./local-settings/local-settings.component";
import { NavigationModule } from "../shared/navigation/navigation.module";
import { I18NextFormatPipe } from "../shared/i18n/i18next.pipe";
import { SharedModule } from "../shared/shared.module";
import { CommonModule } from "@angular/common";
import { ToDosModule } from "../features/todos/todos.module";
import { ToDosViewComponent } from "./todos/view.component";
import { UIShowcaseModule } from "./ui-showcase/ui-showcase.module";
import { LocalSettingsActions } from "./local-settings/api/actions";

@NgModule({
  imports: [
    TagInputModule,
    FileUploadModule,
    // features
    ToDosModule,

    // app modules
    DashboardModule,
    DiagnosticsModule,
    UIShowcaseModule,
    NavigationModule,

    // common / shared modules
    SharedModule,
    CommonModule
  ],
  declarations: [
    AboutComponent,
    TemplateUploader,
    LocalSettingsComponent,
    ToDosViewComponent,
    I18NextFormatPipe
  ],
  exports: [
    DashboardModule,
    DiagnosticsModule,
    UIShowcaseModule,
    AboutComponent,
    LocalSettingsComponent,
    I18NextFormatPipe,
    ToDosViewComponent
  ],
  providers: [LocalSettingsActions],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ViewsModule {}
