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


    // FB.api("2233131936713364", "GET", {fields: ["email", "name"]}, function (r) { console.log("Response %o", r); });
    // {"email":"zsolt@meszarovics.name","name":"Zsolt Mészárovics","id":"2233131936713364"}
    // FB.api("2233131936713364/picture", "GET", {"type": "large", "redirect": 0}, function (r) { console.log("Response %o", r); });
    // {"data":{"height":200,"is_silhouette":false,"url":"https://platform-lookaside.fbsbx.com/platform/profilepic/?asid=2233131936713364&height=200&width=200&ext=1532610349&hash=AeRQAW1YMKixFXsp","width":200}}
}
