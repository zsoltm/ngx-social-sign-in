import { FacebookConfig } from "./facebook-config";
import { LoginService } from "../../login-service";
import { Observable, BehaviorSubject, from } from "rxjs";
import { map, tap, flatMap } from "rxjs/operators";
import { LoginToken } from "../../login-token";
import { FacebookSdkWrapper } from "./facebook-sdk-wrapper";
import { UserDetails } from "../../user-details";
import { ApiUserDetailsResponse } from "./api-user-details-response";
import { NgZone } from "@angular/core";

export class FacebookLoginService implements LoginService {
    static readonly ID = "facebook";
    readonly id = FacebookLoginService.ID;

    private readonly _sdkWrapper: FacebookSdkWrapper;
    private readonly _loginStatus: BehaviorSubject<LoginToken> = new BehaviorSubject({} as LoginToken);

    constructor(document: Document, _config: FacebookConfig, private readonly _zone: NgZone) {
        this._sdkWrapper = new FacebookSdkWrapper(_config, document);
    }

    loginStatus(): Observable<LoginToken> {
        return this._loginStatus;
    }

    login(): Observable<LoginToken> {
        return this._sdkWrapper.sdk.pipe(
            flatMap((sdk) => sdk.login({scope: "public_profile,email"})),
            map((authResponse: fb.AuthResponse) => (
                {
                    id: authResponse.userID,
                    token: authResponse.accessToken
                }
            )),
            tap((loginStatus) => this._loginStatus.next(loginStatus))
        );
    }

    userDetails(token: LoginToken): Observable<UserDetails> {
        let n: any;
        const promise: Promise<UserDetails> = new Promise((resolve) => {
            n = resolve;
        });

        this._sdkWrapper.sdk
            .pipe(
                flatMap((sdk) => this._zone.runOutsideAngular(() => sdk.userDetails(token)))
            )
            .subscribe((apiDetails: ApiUserDetailsResponse) => this._zone.run(() => n({
                name: apiDetails.name,
                email: apiDetails.email,
                id: apiDetails.id,
                picture: apiDetails.picture.data.url
            }
            )));

        return from(promise);
    }
}
