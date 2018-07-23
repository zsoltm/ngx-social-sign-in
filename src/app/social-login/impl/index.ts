import { Type, Provider } from "@angular/core";
import { LoginService } from "../login-service";
import { FacebookLoginService } from "./facebook/facebook-login-service";

export const services: Type<LoginService>[] = [FacebookLoginService];
