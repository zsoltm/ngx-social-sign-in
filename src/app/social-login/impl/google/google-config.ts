/// <reference types="gapi.auth2"/>

import { InjectionToken } from "@angular/core";

export type GoogleConfig = gapi.auth2.ClientConfig;

export const GOOGLE_CONFIG = new InjectionToken("GOOGLE_CONFIG");
