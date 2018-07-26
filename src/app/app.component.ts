import { Component, OnInit } from "@angular/core";
import { SocialLoginService, GlobalLoginStatus, FacebookLoginService,
  GoogleLoginService, UserDetails, LoginToken } from "social-sign-in";

interface LoginData {
  color: string;
  loginToken: LoginToken;
  logout: () => any;
  title: string;
  userDetails: UserDetails;
}

@Component({
  selector: "app-root",
  styleUrls: ["./app.component.scss"],
  templateUrl: "./app.component.html"
})
export class AppComponent implements OnInit {
  facebookUserDetails?: UserDetails;
  fbLoginToken?: LoginToken;
  googleLoginToken?: LoginToken;
  googleUserDetails?: UserDetails;
  loginStatus: GlobalLoginStatus = {};
  title = "Angular-Social-Sign-In";

  private readonly _logins: Map<string, LoginData> = new Map();

  constructor(
      private readonly _loginService: SocialLoginService) {}

  get loginValues() {
    return Array.from(this._logins.values());
  }

  loginFacebook() {
    this._login(FacebookLoginService.ID, "Facebook", "#3b5998", "facebook.svg");
  }

  loginGoogle() {
    this._login(GoogleLoginService.ID, "Google", "#34a853", "google.svg");
  }

  ngOnInit() {
    this._loginService.loginStatus().subscribe((status) => {
      this.loginStatus = status;
    });
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
}
