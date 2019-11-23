import { Injectable } from "@angular/core";
import GoTrue from "gotrue-js";

@Injectable()
export class GoTrueJs {
  auth;
  constructor() {
    this.auth = new GoTrue({
      APIUrl: "https://weingut-admin.netlify.com/.netlify/identity",
      audience: "",
      setCookie: true
    });
  }

  currentUser = () => {
    return this.auth.currentUser();
  };

  acceptInvite = (token, password, inviteSuccess) => {
    this.auth
      .acceptInvite(token, password, true)
      .then(() => inviteSuccess())
      .catch(err => console.error(err));
  };

  login = (formValue, loginSuccess, loginFailure) =>
    this.auth
      .login(formValue.email, formValue.password, formValue.remember)
      .then(() => loginSuccess())
      .catch(() => loginFailure());

  logout = logoutSuccess =>
    this.auth
      .currentUser()
      .logout()
      .then(() => logoutSuccess())
      .catch(err => console.error(err));
}
