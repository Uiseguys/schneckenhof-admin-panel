/**
 * Created by Tall Prince on 5/27/2017.
 */
import { Injectable } from "@angular/core";
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
  CanLoad,
  Route,
  CanActivate
} from "@angular/router";
import { Observable } from "rxjs";
import { ClientApiService } from "../../services/api/clientapi.service";
import { SettingsService } from "../../services/settings/settings.service";
import { GoTrueJs } from "../../services/netlify/gotrue-js.service";

@Injectable()
export class AuthGuardResolve implements Resolve<any>, CanLoad, CanActivate {
  user;
  constructor(
    private router: Router,
    private settings: SettingsService,
    private api: ClientApiService,
    private gotrue: GoTrueJs
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      const user = this.gotrue.currentUser();
      if (user) {
        resolve(user);
      } else {
        reject("Dashboard Permission Denied");
        this.router.navigate(["/login"]);
      }
    });
  }

  canLoad(route: Route): boolean | Observable<boolean> | Promise<boolean> {
    return true;
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean> | Promise<boolean> {
    if (
      this.settings.getStorage("token") &&
      this.settings.getStorage("userId")
    ) {
      this.router.navigate(["/dashboard"]);
      return false;
    }
    return true;
  }
}
