/// <reference types="facebook-js-sdk"/>

import { Observable, Observer, from } from "rxjs";
import { ApiUserDetailsResponse } from "./api-user-details-response";
import { LoginToken } from "../../login-token";

const CONNECTED_STATUS_RESPONSE = "connected";

export class FacebookSdk {
    login(loginOptions?: fb.LoginOptions): Observable<fb.AuthResponse> {
        return new Observable((observer: Observer<fb.AuthResponse>) => {
            console.log("Facebook SDK login %o", loginOptions);
            FB.login((statusResponse) => {
                console.log("Facebook SDK login response %o", statusResponse);
                if (statusResponse.status === CONNECTED_STATUS_RESPONSE) {
                    observer.next(statusResponse.authResponse);
                } else {
                    observer.error(statusResponse.status);
                }
                observer.complete();
            }, loginOptions);
        });
    }

    userDetails(token: LoginToken): Observable<ApiUserDetailsResponse> {
        return from(new Promise((resolve) => {
            FB.api(token.id, "GET", {fields: ["email", "name", "picture.type(large).redirect(0)"]},
                    (response: ApiUserDetailsResponse) => {
                        resolve(response);
                    });
        }));
    }
}
