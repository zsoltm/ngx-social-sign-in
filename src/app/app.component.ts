import { Component, OnInit, OnDestroy } from "@angular/core";
import { SocialSignInService, GlobalSignInStatus, FacebookSignInService,
  GoogleSignInService, UserDetails, SignInToken } from "ngx-social-sign-in";
import { Subscription } from "rxjs";

interface SignInData {
  color: string;
  signInToken: SignInToken;
  signOut: () => any;
  title: string;
  userDetails: UserDetails;
}

@Component({
  selector: "app-root",
  styleUrls: ["./app.component.scss"],
  templateUrl: "./app.component.html"
})
export class AppComponent implements OnInit, OnDestroy {
  signInStatus: GlobalSignInStatus = {};
  title = "ngx-Social-Sign-In";

  private readonly _signIns: Map<string, SignInData> = new Map();
  private _signInStatus?: Subscription;

  constructor(
      private readonly _signInService: SocialSignInService) {}

  ngOnDestroy() {
    if (this._signInStatus) this._signInStatus.unsubscribe();
  }

  ngOnInit() {
    this._signInStatus = this._signInService.signInStatus().subscribe((status) => {
      this.signInStatus = status;
    });
  }

  get signInValues() {
    return Array.from(this._signIns.values());
  }

  signInFacebook() {
    this._signIn(FacebookSignInService.ID, "Facebook", "#3b5998", "facebook.svg");
  }

  signInGoogle() {
    this._signIn(GoogleSignInService.ID, "Google", "#34a853", "google.svg");
  }

  private _signIn(impl: string, title: string, color: string, logo: string) {
    this._signInService.signInWithUserDetails(impl).subscribe(([signInToken, userDetails]) => {
      this._signIns.set(impl, {
        title: title,
        color: color,
        userDetails: userDetails,
        signInToken: signInToken,
        signOut: () => this._signOut(impl)
      });
    });
  }

  private _signOut(impl: string) {
    this._signInService.signOut(impl).subscribe((resposne) => {
      console.log("Logged out from", impl);
      this._signIns.delete(impl);
    });
  }
}
