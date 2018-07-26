/// <reference types="gapi"/>
/// <reference types="gapi.auth2"/>

import { Observable, from } from "rxjs";
import { Auth2 } from "./auth2";
import { GoogleConfig } from "./google-config";

export enum Api {
    Auth2 = "auth2"
}

export class Gapi {
    private _gapi_auth2$?: Observable<Auth2>;

    constructor(private readonly _config: GoogleConfig) {}

    load(api: Api.Auth2): Observable<Auth2> {
        return this._gapi_auth2$ || this._loadAndCacheAuth2();
    }

    private _loadAndCacheAuth2(): Observable<Auth2> {
        const api2Promise: Promise<Auth2> = new Promise((resolve) => {
            gapi.load("auth2", () => {
                gapi.auth2.init(this._config).then((googleAuth) => {
                    resolve(new Auth2(googleAuth));
                });
            });
        });

        return (this._gapi_auth2$ = from(api2Promise));
    }
}
