/// <reference types="gapi.auth2"/>

import { InjectionToken } from "@angular/core";
import { SignInServiceConfig } from "../../login-service-config";

export type GoogleConfig = gapi.auth2.ClientConfig;

export const GOOGLE_CONFIG = new InjectionToken("GOOGLE_CONFIG");

export function googleConfigFactory(config: SignInServiceConfig) {
    return config.providers.google;
}
