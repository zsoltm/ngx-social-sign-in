import { Component, OnInit } from "@angular/core";
import { SocialLoginService } from "./social-login/social-login.service";
import { GlobalLoginStatus } from "./social-login/global-login-status";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {
  title = "Angular-Social-Login";
  loginStatus: GlobalLoginStatus = {};

  constructor(private readonly _loginService: SocialLoginService) {
  }

  ngOnInit() {
    this._loginService.loginStatus().subscribe((status) => {
      this.loginStatus = status;
    });
  }
}
