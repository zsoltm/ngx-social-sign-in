import { Injectable, Optional, Injector, Type, InjectionToken, InjectFlags } from "@angular/core";
import { Observable, BehaviorSubject, Subject } from "rxjs";
import { GlobalSignInStatus } from "./global-login-status";
import { SignInServiceConfig } from "./login-service-config";
import { SignInService } from "./login-service";
import { SignInToken } from "./login-token";
import { FacebookSignInService } from "./impl/facebook/facebook-login-service";
import { GoogleSignInService } from "./impl/google/google-login-service";
import { GOOGLE_CONFIG } from "./impl/google/google-config";
import { FACEBOOK_CONFIG } from "./impl/facebook/facebook-config";
import { UserDetails } from "./user-details";

const serviceConfigMap: Map<InjectionToken<any>, Type<SignInService>> = new Map([
    [GOOGLE_CONFIG, GoogleSignInService as Type<SignInService>],
    [FACEBOOK_CONFIG, FacebookSignInService as Type<SignInService>]
]);

@Injectable({
    providedIn: "root"
})
export class SocialSignInService {
    private _signInStatus: GlobalSignInStatus = {};
    private readonly _signInStatusSubject: Subject<GlobalSignInStatus> = new BehaviorSubject(this._signInStatus);
    private readonly _serviceMap: Map<string, SignInService>;

    constructor(@Optional() private readonly _config: SignInServiceConfig, injector: Injector) {
        if (!this._config) throw new Error("Please specify a provider for SignInServiceConfig()");

        const configuredServices = Array.from(serviceConfigMap.entries())
            .map(([configToken, type]) => [injector.get(configToken, null), type])
            .filter(([config, _]) => config)
            .map(([_, type]) => injector.get(type as Type<SignInService>));

        this._serviceMap = new Map(
            configuredServices.map((service) =>
                    [service.id, service] as [string, SignInService]));
        configuredServices.forEach(service =>
                service.signInStatus().subscribe(signInStatus =>
                        this._updateSignInStatus(service.id, signInStatus)));
    }

    impl(id: string): SignInService {
        const service = this._serviceMap.get(id);
        if (!service) throw new Error(`Service ${id} is not configured, check config provider.`);
        return service;
    }

    signIn(impl: string): Observable<SignInToken> {
        return this.impl(impl).signIn();
    }

    signInStatus(): Observable<GlobalSignInStatus> {
        return this._signInStatusSubject.asObservable();
    }

    /** Convenience method that logs the user in and immediately fetches user details in on run. */
    signInWithUserDetails(impl: string): Observable<[SignInToken, UserDetails]> {
        return this.impl(impl).signInWithUserDetails();
    }

    signOut(impl: string): Observable<boolean> {
        return this.impl(impl).signOut();
    }

    userDetails(impl: string, signInToken: SignInToken): Observable<UserDetails> {
        return this.impl(impl).userDetails(signInToken);
    }

    private _updateSignInStatus(id: any, signInToken: SignInToken | null) {
        this._signInStatus = Object.assign({}, this._signInStatus, {[id]: signInToken});
        this._signInStatusSubject.next(this._signInStatus);
    }
}
