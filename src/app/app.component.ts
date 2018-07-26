import { Component, OnInit } from "@angular/core";
import { SocialLoginService, GlobalLoginStatus, FacebookLoginService,
  GoogleLoginService, UserDetails, LoginToken } from "social-sign-in";

interface LoginData {
  title: string;
  color: string;
  userDetails: UserDetails;
  loginToken: LoginToken;
  logout: () => any;
}

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {
  title = "Angular-Social-Sign-In";
  loginStatus: GlobalLoginStatus = {};

  fbLoginToken?: LoginToken;
  googleLoginToken?: LoginToken;
  facebookUserDetails?: UserDetails;
  googleUserDetails?: UserDetails;

  private readonly _logins: Map<string, LoginData> = new Map();

  constructor(
      private readonly _loginService: SocialLoginService) {}

  ngOnInit() {
    this._loginService.loginStatus().subscribe((status) => {
      this.loginStatus = status;
    });
  }

  get loginValues() {
    return Array.from(this._logins.values());
  }

  private _login(impl: string, title: string, color: string, logo: string) {
    this._loginService.loginWithUserDetails(impl).subscribe(([loginToken, userDetails]) => {
      this._logins.set(impl, {
        title: title,
        color: color,
        userDetails: userDetails,
        loginToken: loginToken,
        logout: () => this._logout(impl)
      });
    });
  }

  private _logout(impl: string) {
    this._loginService.logout(impl).subscribe((resposne) => {
      console.log("logged out from", impl);
      this._logins.delete(impl);
    });
  }

  loginFacebook() {
    this._login(FacebookLoginService.ID, "Facebook", "#3b5998", "facebook.svg");
  }

  loginGoogle() {
    this._login(GoogleLoginService.ID, "Google", "#34a853", "google.svg");
  }
}
