/// <reference types="gapi.auth2"/>

import { LoginService } from "../../login-service";
import { Observable, BehaviorSubject, from, throwError } from "rxjs";
import { LoginToken } from "../../login-token";
import { GapiWrapper } from "./gapi-wrapper";
import { flatMap, map, tap } from "rxjs/operators";
import { Injectable, Inject, InjectionToken, ApplicationRef } from "@angular/core";
import { UserDetails } from "../../user-details";
import { GoogleConfig, GOOGLE_CONFIG } from "./google-config";

export const GOOGLE_LOGIN_SERVICE_ID = "google";

function mapBasicProfile(basicProfile: gapi.auth2.BasicProfile): UserDetails {
    return {
        id: basicProfile.getId(),
        email: basicProfile.getEmail(),
        name: basicProfile.getName(),
        picture: basicProfile.getImageUrl()
    };
}

/**
 * Google Authentication Service
 * 
 * Official documentation: https://developers.google.com/identity/sign-in/web/reference
 */
@Injectable()
export class GoogleLoginService implements LoginService {
    id = GOOGLE_LOGIN_SERVICE_ID;
    private _loginUser?: gapi.auth2.GoogleUser;
    private _userDetails?: UserDetails;
    private readonly _loginStatus = new BehaviorSubject(null) as BehaviorSubject<LoginToken | null>;

    constructor(
        private readonly _appref: ApplicationRef,
        private readonly _gapiWrapper: GapiWrapper,
        @Inject(GOOGLE_CONFIG) private readonly _config: GoogleConfig,
    ) {}

    loginStatus(): Observable<LoginToken | null> {
        return this._loginStatus;
    }

    login(): Observable<LoginToken> {
        return this._gapiWrapper.gapi_auth2.pipe(
            flatMap((auth2) => auth2.signIn()),
            map((googleUser) => {
                const authResponse = googleUser.getAuthResponse(true);
                this._userDetails = mapBasicProfile(googleUser.getBasicProfile());
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
        return this._gapiWrapper.gapi_auth2.pipe(
            flatMap((auth2) => auth2.signOut()),
            map((signoutResponse) => true),
            tap({complete: () => {
                this._userDetails = undefined;
                this._loginUser = undefined;
                this._loginStatus.next(null);
                this._appref.tick();
            }})
        )
    }

    userDetails(token: LoginToken): Observable<UserDetails> {
        return this._userDetails ? from([this._userDetails]) : throwError(new Error("Not signed in"));
    }
}
