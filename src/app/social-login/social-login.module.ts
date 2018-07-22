import { NgModule } from "@angular/core";
import { CommonModule, DOCUMENT } from "@angular/common";
import { SocialLoginService } from "./social-login.service";
import { LoginServiceConfig } from "./login-service-config";
import { facebookLoginServiceProvider } from "./impl/facebook/facebook-login-service-provider";
import { providers } from "./impl";

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [
    SocialLoginService,
    ...providers
  ]
})
export class SocialLoginModule {}
