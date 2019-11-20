import { Injectable } from "@angular/core";
import * as netlifyIdentity from "netlify-identity-widget";

@Injectable()
export class NetlifyWidgetService {
  constructor() {}
  init = element => {
    netlifyIdentity.init({ container: element });
  };
  login = () => netlifyIdentity.open("login");
  signup = () => netlifyIdentity.open("signup");
  currentUser = () => netlifyIdentity.currentUser();
}
