import { Provider } from "@angular/core";
import { FacebookLoginService } from "./facebook-login-service";
import { LoginServiceConfig } from "../../login-service-config";
import { DOCUMENT } from "@angular/common";

export const facebookLoginServiceProvider: Provider = {
    provide: FacebookLoginService,
    useFactory: (document: Document, config: LoginServiceConfig) => config.services.facebook && document.defaultView ?
        new FacebookLoginService(document.defaultView, config.services.facebook) :
        null,
    deps: [DOCUMENT, LoginServiceConfig]
};
