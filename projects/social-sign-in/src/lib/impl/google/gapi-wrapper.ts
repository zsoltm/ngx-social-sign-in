/// <reference types="gapi"/>

import { Injectable, Inject } from "@angular/core";
import { DOCUMENT } from "@angular/common";
import { Observable, from } from "rxjs";
import { flatMap } from "rxjs/operators";
import { Gapi, Api } from "./gapi";
import { GoogleConfig, GOOGLE_CONFIG } from "./google-config";
import { Auth2 } from "./auth2";

const GOOGLE_PLATFORM_SCRIPT_ID = "google-platform-sdk";
const GLOBAL_ASYNC_INIT_CALLBACK = "googleAsyncInit";

const loadPlatformScript = (document: Document) => {
    if (document.getElementById(GOOGLE_PLATFORM_SCRIPT_ID)) return;
    const js = document.createElement("script") as HTMLScriptElement;
    js.id = GOOGLE_PLATFORM_SCRIPT_ID;
    js.src = `https://apis.google.com/js/platform.js?onload=${GLOBAL_ASYNC_INIT_CALLBACK}`;
    js.defer = true;
    js.async = true;
    document.body.appendChild(js);
};

@Injectable()
export class GapiWrapper {
    private _gapi$?: Observable<Gapi>;

    constructor(
        @Inject(DOCUMENT) private readonly _document: any /* Document */,
        @Inject(GOOGLE_CONFIG) private readonly _config: GoogleConfig) {}

    get gapi(): Observable<Gapi> {
        return this._gapi$ || this._loadSdk();
    }

    get gapi_auth2(): Observable<Auth2> {
        return this.gapi.pipe(flatMap((gapi) => gapi.load(Api.Auth2)));
    }

    private _loadSdk(): Observable<Gapi> {
        loadPlatformScript(this._document);
        const sdkPromise: Promise<Gapi> = new Promise((resolve) => {
            Object.assign(window, {[GLOBAL_ASYNC_INIT_CALLBACK]: () => {
                resolve(new Gapi(this._config));
            }});
        });
        return (this._gapi$ = from(sdkPromise));
    }
}
