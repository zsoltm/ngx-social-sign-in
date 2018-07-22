import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { SocialLoginModule } from "./social-login/social-login.module";
import { LoginServiceConfig } from "./social-login/login-service-config";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule, SocialLoginModule
  ],
  providers: [
    {
      provide: LoginServiceConfig,
      useValue: {
        services: {
          facebook: { appId: "2118773085004035" }
        }
      } as LoginServiceConfig
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
