import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";

import { SharedModule } from "../shared/shared.module";
import { AuthGuardResolve } from "../services/authguard/authguard.service";
import { ServicesModule } from "../services/services.module";
import { LayoutModule } from "../layout/layout.module";
import { DashboardLayoutComponent } from "../layout/dashboardlayout/dashboardlayout.component";
import { LoginPage } from "./login/login.page";
import { RegisterPage } from "./register/register.page";

export const routes = [
  {
    path: "login",
    component: LoginPage,
    canActivate: [AuthGuardResolve]
  },
  {
    path: "dashboard",
    component: DashboardLayoutComponent,
    resolve: {
      user: AuthGuardResolve
    },
    children: [
      //{ path: '', redirectTo: '/dashboard/red', pathMatch: 'full' },

      //{
      //path: 'packaging',
      //loadChildren: () => import('./packaging/packaging.module').then(m => m.PackagingModule)
      //},
      //{ path: 'payments', loadChildren: () => import('./order/order.module').then(m => m.OrderModule) },
      //{
      //path: 'templates',
      //loadChildren: () => import('./template/template.module').then(m => m.TemplateModule)
      //},
      //{
      //path: 'images',
      //loadChildren: () => import('./image/image.module').then(m => m.ImageModule)
      //},
      {
        path: "settings",
        loadChildren: () =>
          import("./setting/setting.module").then(m => m.SettingModule)
      },
      {
        path: "", // Original path is news
        loadChildren: () => import("./news/news.module").then(m => m.NewsModule)
      }
      //{
      //path: ":type",
      //loadChildren: () => import("./wine/wine.module").then(m => m.WineModule)
      //}
    ]
  },
  { path: "**", redirectTo: "login" }
  // Not found
];

@NgModule({
  imports: [SharedModule, LayoutModule, RouterModule.forRoot(routes)],
  declarations: [LoginPage, RegisterPage],
  providers: [],
  exports: [RouterModule]
})
export class PagesModule {}
