import { Type, Provider } from "@angular/core";
import { LoginService } from "../login-service";
import { FacebookLoginService } from "./facebook/facebook-login-service";
import { facebookLoginServiceProvider } from "./facebook/facebook-login-service-provider";

export const services: Type<LoginService>[] = [FacebookLoginService];

export const providers: Provider[] = [
    facebookLoginServiceProvider
];
