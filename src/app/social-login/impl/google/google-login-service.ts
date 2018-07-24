/// <reference types="gapi.auth2"/>

import { LoginService } from "../../login-service";
import { Observable, BehaviorSubject, from } from "rxjs";
import { LoginToken } from "../../login-token";
import { GapiWrapper } from "./gapi-wrapper";
import { flatMap, map, tap } from "rxjs/operators";
import { Injectable, Inject, InjectionToken } from "@angular/core";
import { UserDetails } from "../../user-details";
import { GoogleConfig, GOOGLE_CONFIG } from "./google-config";

export const GOOGLE_LOGIN_SERVICE_ID = "google";

@Injectable()
export class GoogleLoginService implements LoginService {
    id = GOOGLE_LOGIN_SERVICE_ID;
    private _loginUser?: gapi.auth2.GoogleUser;
    private readonly _loginStatus = new BehaviorSubject(null) as BehaviorSubject<LoginToken | null>;

    constructor(
        private readonly _gapiWrapper: GapiWrapper,
        @Inject(GOOGLE_CONFIG) private readonly _config: GoogleConfig
    ) {}

    loginStatus(): Observable<LoginToken | null> {
        return this._loginStatus;
    }

    login(): Observable<LoginToken> {
        return this._gapiWrapper.gapi_auth2.pipe(
            flatMap((auth2) => auth2.signIn()),
            map((googleUser) => {
                const authResponse = googleUser.getAuthResponse();
                this._loginUser = googleUser;
                return {
                    id: googleUser.getId(),
                    token: authResponse.access_token
                };
            }),
            tap((loginToken) => this._loginStatus.next(loginToken))
        );
    }

    logout(): Observable<boolean> {
        return from([]); // TODO implement
    }

    userDetails(token: LoginToken): Observable<UserDetails> {
        return from([]); // TODO implement
    }
}
