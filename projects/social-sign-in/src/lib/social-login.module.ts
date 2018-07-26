import { NgModule, ApplicationRef } from "@angular/core";
import { CommonModule, DOCUMENT } from "@angular/common";
import { SocialLoginService } from "./social-login.service";
import { LoginServiceConfig } from "./login-service-config";
import { FacebookLoginService } from "./impl/facebook/facebook-login-service";
import { GapiWrapper } from "./impl/google/gapi-wrapper";
import { GOOGLE_CONFIG, googleConfigFactory } from "./impl/google/google-config";
import { GoogleLoginService } from "./impl/google/google-login-service";
import { FACEBOOK_CONFIG, facebookConfigFactory } from "./impl/facebook/facebook-config";

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [
    SocialLoginService,
    {
      provide: GOOGLE_CONFIG,
      useFactory: googleConfigFactory,
      deps: [LoginServiceConfig]
    },
    {
      provide: FACEBOOK_CONFIG,
      useFactory: facebookConfigFactory,
      deps: [LoginServiceConfig]
    },
    GapiWrapper,
    GoogleLoginService,
    FacebookLoginService
  ]
})
export class SocialLoginModule {}
