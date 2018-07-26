import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SocialSignInService } from "./social-login.service";
import { SignInServiceConfig } from "./login-service-config";
import { FacebookSignInService } from "./impl/facebook/facebook-login-service";
import { GapiWrapper } from "./impl/google/gapi-wrapper";
import { GOOGLE_CONFIG, googleConfigFactory } from "./impl/google/google-config";
import { GoogleSignInService } from "./impl/google/google-login-service";
import { FACEBOOK_CONFIG, facebookConfigFactory } from "./impl/facebook/facebook-config";

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [
    SocialSignInService,
    {
      provide: GOOGLE_CONFIG,
      useFactory: googleConfigFactory,
      deps: [SignInServiceConfig]
    },
    {
      provide: FACEBOOK_CONFIG,
      useFactory: facebookConfigFactory,
      deps: [SignInServiceConfig]
    },
    GapiWrapper,
    GoogleSignInService,
    FacebookSignInService
  ]
})
export class SocialSignInModule {}
