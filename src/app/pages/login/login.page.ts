import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { ToasterService, ToasterConfig } from "angular2-toaster";

import { SettingsService } from "../../services/settings/settings.service";
import { ClientApiService } from "../../services/api/clientapi.service";
import { GoTrueJs } from "../../services/netlify/gotrue-js.service";

declare const Buffer;

@Component({
  selector: "app-login-page",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"]
})
export class LoginPage implements OnInit {
  user;
  inviteToken;
  recoveryToken;
  submitButton = 1;
  loginForm: FormGroup;
  invitationForm: FormGroup;
  formErr = 0;
  toasterconfig = new ToasterConfig({
    showCloseButton: false,
    tapToDismiss: false,
    timeout: 2000
  });

  constructor(
    public router: Router,
    public activeRoute: ActivatedRoute,
    private fb: FormBuilder,
    private api: ClientApiService,
    private toasterService: ToasterService,
    private settings: SettingsService,
    private gotrue: GoTrueJs
  ) {
    this.loginForm = fb.group({
      email: ["", Validators.compose([Validators.required, Validators.email])],
      password: ["", Validators.compose([Validators.required])],
      remember: [0]
    });

    this.invitationForm = fb.group({
      password: ["", Validators.compose([Validators.required])]
    });

    this.user = this.gotrue.currentUser();
  }

  ngOnInit() {
    // Check to see if the URL contains a recovery or invitation token
    if (/[\#]\S+\=\S+/.test(this.router.url)) {
      const getRouteAnchorParams = /[\#]\S+\=\S+/.exec(this.router.url);
      if (/invite_token/.test(getRouteAnchorParams[0])) {
        this.inviteToken = /\=\S+$/
          .exec(getRouteAnchorParams[0])[0]
          .replace(/\=/, "");
      }
      if (/recovery_token/.test(getRouteAnchorParams[0])) {
        this.recoveryToken = /\=\S+$/
          .exec(getRouteAnchorParams[0])[0]
          .replace(/\=/, "");
      }
    }
  }

  login($event) {
    $event.preventDefault();
    this.submitButton = 0;
    if (this.formErr) {
      this.formErr = 0;
    }

    for (let c in this.loginForm.controls) {
      this.loginForm.controls[c].markAsTouched();
    }

    if (!this.loginForm.valid) return;
    const loginSuccess = () => {
      this.router.navigate(["/dashboard"]);
    };
    const loginFailure = () => {
      this.formErr = 1;
      this.submitButton = 1;
    };

    this.gotrue.login(this.loginForm.value, loginSuccess, loginFailure);
  }

  acceptInvite($event) {
    $event.preventDefault();
    this.submitButton = 0;
    if (this.formErr) {
      this.formErr = 0;
    }

    for (let c in this.invitationForm.controls) {
      this.invitationForm.controls[c].markAsTouched();
    }
    if (!this.invitationForm.valid) return;
    const inviteSuccess = () => {
      this.router.navigate(["/dashboard"]);
    };
    const inviteFailure = () => {
      this.formErr = 1;
      this.submitButton = 1;
    };
    this.gotrue.acceptInvite(
      this.inviteToken,
      this.invitationForm.value.password,
      inviteSuccess,
      inviteFailure
    );
  }
}
