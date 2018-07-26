import { ApplicationRef, Injectable, Inject } from "@angular/core";
import { DOCUMENT } from "@angular/common";
import { FacebookConfig, FACEBOOK_CONFIG } from "./facebook-config";
import { SignInService } from "../../login-service";
import { Observable, BehaviorSubject } from "rxjs";
import { map, tap, flatMap } from "rxjs/operators";
import { SignInToken } from "../../login-token";
import { FacebookSdkWrapper } from "./facebook-sdk-wrapper";
import { UserDetails } from "../../user-details";
import { ApiUserDetailsResponse } from "./api-user-details-response";

@Injectable()
export class FacebookSignInService implements SignInService {
    static readonly ID = "facebook";
    readonly id = FacebookSignInService.ID;

    private readonly _loginStatus = new BehaviorSubject(null) as BehaviorSubject<SignInToken | null>;
    private readonly _sdkWrapper: FacebookSdkWrapper;

    constructor(@Inject(DOCUMENT) document: any /* Document */, @Inject(FACEBOOK_CONFIG) _config: FacebookConfig,
        private readonly _appRef: ApplicationRef
    ) {
        this._sdkWrapper = new FacebookSdkWrapper(_config, document);
    }

    signIn(): Observable<SignInToken> {
        return this._sdkWrapper.sdk.pipe(
            flatMap((sdk) => sdk.login({scope: "public_profile,email"})),
            map((authResponse: fb.AuthResponse) => (
                {
                    id: authResponse.userID,
                    token: authResponse.accessToken
                }
            )),
            tap((loginToken) => this._loginStatus.next(loginToken))
        );
    }

    signInStatus(): Observable<SignInToken | null> {
        return this._loginStatus;
    }

    signInWithUserDetails(): Observable<[SignInToken, UserDetails]> {
        return this.signIn().pipe(
            flatMap((loginToken) => this.userDetails(loginToken).pipe(
                map((userDetails) => [loginToken, userDetails] as [SignInToken, UserDetails])
              )
            )
          );
    }

    signOut(): Observable<boolean> {
        return this._sdkWrapper.sdk
            .pipe(
                flatMap((sdk) => sdk.logout()),
                tap({
                    next: (logoutSuccess) => {
                        if (logoutSuccess) this._loginStatus.next(null);
                    },
                    complete: () => this._appRef.tick()
                })
            );
    }

    userDetails(token: SignInToken): Observable<UserDetails> {
        return this._sdkWrapper.sdk
            .pipe(
                flatMap((sdk) => sdk.userDetails(token)),
                map((apiDetails: ApiUserDetailsResponse) => (
                    {
                        name: apiDetails.name,
                        email: apiDetails.email,
                        id: apiDetails.id,
                        picture: apiDetails.picture.data.url
                    })),
                tap({
                    complete: () => {
                        this._appRef.tick(); // ngZone doesn't notices the change
                    }
                })
            );
    }
}
