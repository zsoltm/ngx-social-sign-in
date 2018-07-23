import { NgModule } from "@angular/core";
import { CommonModule, DOCUMENT } from "@angular/common";
import { SocialLoginService } from "./social-login.service";
import { LoginServiceConfig } from "./login-service-config";
import { FacebookLoginService } from "./impl/facebook/facebook-login-service";

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [
    SocialLoginService,
    {
      provide: FacebookLoginService,
      useFactory: (document: Document, config: LoginServiceConfig) => config.services.facebook && document ?
        new FacebookLoginService(document, config.services.facebook) :
        null,
      deps: [DOCUMENT, LoginServiceConfig]
    }
  ]
})
export class SocialLoginModule {}
