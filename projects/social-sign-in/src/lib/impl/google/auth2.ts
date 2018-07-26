/// <reference types="gapi.auth2"/>

import { Observable, from } from "rxjs";

export class Auth2 {
    constructor(private readonly _googleAuth: gapi.auth2.GoogleAuth) {}

    signIn(): Observable<gapi.auth2.GoogleUser> {
        return from(this._googleAuth.signIn());
    }

    signOut(): Observable<any> {
        return from(this._googleAuth.signOut());
    }
}
