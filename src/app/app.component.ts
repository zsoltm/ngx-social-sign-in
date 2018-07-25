import { Component, OnInit, ChangeDetectorRef, ChangeDetectionStrategy } from "@angular/core";
import { SocialLoginService } from "./social-login/social-login.service";
import { GlobalLoginStatus } from "./social-login/global-login-status";
import { FacebookLoginService } from "./social-login/impl/facebook/facebook-login-service";
import { LoginService } from "./social-login/login-service";
import { UserDetails } from "./social-login/user-details";
import { flatMap, map } from "rxjs/operators";
import { LoginToken } from "./social-login/login-token";
import { GoogleLoginService } from "./social-login/impl/google/google-login-service";
import { Observable } from "rxjs";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {
  title = "Angular-Social-Login";
  loginStatus: GlobalLoginStatus = {};
  fbLoginToken?: LoginToken;
  googleLoginToken?: LoginToken;
  facebookUserDetails?: UserDetails;
  googleUserDetails?: UserDetails;

  constructor(
      private readonly _loginService: SocialLoginService,
      private readonly _fbLoginService: FacebookLoginService,
      private readonly _googleLoginService: GoogleLoginService) {
  }

  ngOnInit() {
    this._loginService.loginStatus().subscribe((status) => {
      this.loginStatus = status;
    });
  }

  loginFacebook() {
    this._loginWithService(this._fbLoginService).subscribe(([loginToken, userDetails]) => {
      this.fbLoginToken = loginToken;
      this.facebookUserDetails = userDetails;
      });
  }

  logoutFacebook() {
    this._fbLoginService.logout().subscribe((response) => {
      this.fbLoginToken = undefined;
      this.facebookUserDetails = undefined;
    });
  }

  loginGoogle() {
      this._loginWithService(this._googleLoginService).subscribe(([loginToken, userDetails]) => {
        this.googleLoginToken = loginToken;
        this.googleUserDetails = userDetails;
      });
  }

  logoutGoogle() {
    this._googleLoginService.logout().subscribe((resposne) => {
      console.log("logged out");
      this.googleLoginToken = undefined;
      this.googleUserDetails = undefined;
    });
  }

  private _loginWithService(service: LoginService): Observable<[LoginToken, UserDetails]> {
    return service.login().pipe(
      flatMap((loginToken) =>service.userDetails(loginToken).pipe(
          map((userDetails) => [loginToken, userDetails] as [LoginToken, UserDetails])
        )
      )
    );
  }
}
