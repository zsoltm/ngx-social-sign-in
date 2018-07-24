import { Component, OnInit, ChangeDetectorRef, ChangeDetectionStrategy } from "@angular/core";
import { SocialLoginService } from "./social-login/social-login.service";
import { GlobalLoginStatus } from "./social-login/global-login-status";
import { FacebookLoginService } from "./social-login/impl/facebook/facebook-login-service";
import { LoginService } from "./social-login/login-service";
import { UserDetails } from "./social-login/user-details";
import { flatMap, tap } from "rxjs/operators";
import { LoginToken } from "./social-login/login-token";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {
  title = "Angular-Social-Login";
  loginStatus: GlobalLoginStatus = {};
  fbLoginToken?: LoginToken;
  facebookUserDetails?: UserDetails;

  constructor(
      private readonly _loginService: SocialLoginService,
      private readonly _fbLoginService: FacebookLoginService) {
  }

  ngOnInit() {
    this._loginService.loginStatus().subscribe((status) => {
      this.loginStatus = status;
    });
  }

  loginFacebook() {
    this._fbLoginService.login() // .subscribe((token) => { this.fbLoginToken = token; });
      .pipe(
        tap((token) => { this.fbLoginToken = token; }),
        flatMap((token) => this._fbLoginService.userDetails(token))
      )
      .subscribe((details) => {
        console.log("Facebook User Details: %o", details);
        this.facebookUserDetails = details;
      });
  }

  logoutFacebook() {
    this._fbLoginService.logout().subscribe((response) => this.facebookUserDetails = undefined);
  }

  loginGoogle() {
    console.log("login google");
  }
}
