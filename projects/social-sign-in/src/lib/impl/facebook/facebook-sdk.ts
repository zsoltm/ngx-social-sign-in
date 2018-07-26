/// <reference types="facebook-js-sdk"/>

import { Observable, Observer, from } from "rxjs";
import { ApiUserDetailsResponse } from "./api-user-details-response";
import { LoginToken } from "../../login-token";

const CONNECTED_STATUS_RESPONSE = "connected";

export class FacebookSdk {
    login(loginOptions?: fb.LoginOptions): Observable<fb.AuthResponse> {
        return new Observable((observer: Observer<fb.AuthResponse>) => {
            FB.login((statusResponse) => {
                if (statusResponse.status === CONNECTED_STATUS_RESPONSE) {
                    observer.next(statusResponse.authResponse);
                } else {
                    observer.error(statusResponse.status);
                }
                observer.complete();
            }, loginOptions);
        });
    }

    logout(): Observable<any> {
        return from(new Promise((resolve) => {
            FB.logout((response) => resolve(response.status === "unknown"));
        }));
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
