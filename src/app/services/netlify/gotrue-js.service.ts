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

  login = (formValue, loginSuccess) =>
    this.auth
      .login(formValue.email, formValue.password)
      .then(() => loginSuccess())
      .catch(err => console.error(err));

  logout = logoutSuccess =>
    this.auth
      .currentUser()
      .logout()
      .then(() => logoutSuccess())
      .catch(err => console.error(err));
}
