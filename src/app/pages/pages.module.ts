import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from 'shared/shared.module';
import { AuthGuardResolve } from 'services/authguard/authguard.service';
import { ServicesModule } from 'services/services.module';
import { LayoutModule } from 'layout/layout.module';
import { DashboardLayoutComponent } from 'layout/dashboardlayout/dashboardlayout.component';
import { LoginPage } from './login/login.page';
import { RegisterPage } from './register/register.page';

export const routes = [
  {
    path: 'login',
    component: LoginPage,
    canActivate: [AuthGuardResolve]
  },
  {
    path: 'dashboard',
    component: DashboardLayoutComponent,
    resolve: {
      user: AuthGuardResolve
    },
    children: [
      { path: '', redirectTo: '/dashboard/red', pathMatch: 'full' },

      { path: 'payments', loadChildren: './order/order.module#OrderModule' },
      {
        path: 'templates',
        loadChildren: './template/template.module#TemplateModule'
      },
      {
        path: 'settings',
        loadChildren: './setting/setting.module#SettingModule'
      },
      { path: ':type', loadChildren: './wine/wine.module#WineModule' }
    ]
  },
  { path: '**', redirectTo: 'login' }
  // Not found
];

@NgModule({
  imports: [SharedModule.forRoot(), LayoutModule, RouterModule.forRoot(routes)],
  declarations: [LoginPage, RegisterPage],
  providers: [],
  exports: [RouterModule]
})
export class PagesModule {}
