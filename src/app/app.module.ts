import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { SocialSignInModule, SignInServiceConfig } from "ngx-social-sign-in";
import { UserDetailsComponent } from "./user-details.component";

@NgModule({
  declarations: [
    AppComponent, UserDetailsComponent
  ],
  imports: [
    BrowserModule, SocialSignInModule
  ],
  providers: [
    {
      provide: SignInServiceConfig,
      useValue: {
        providers: {
          facebook: { appId: "2118773085004035" },
          google: { client_id: "503011657621-9edc5quaqj50oolivm4hdn2um8mh7diq.apps.googleusercontent.com" }
        }
      } as SignInServiceConfig
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
