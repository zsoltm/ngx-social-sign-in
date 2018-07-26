import { Injectable, Optional, Injector, Type, InjectionToken, InjectFlags } from "@angular/core";
import { Observable, BehaviorSubject, Subject } from "rxjs";
import { GlobalLoginStatus } from "./global-login-status";
import { LoginServiceConfig } from "./login-service-config";
import { LoginService } from "./login-service";
import { LoginToken } from "./login-token";
import { FacebookLoginService } from "./impl/facebook/facebook-login-service";
import { GoogleLoginService } from "./impl/google/google-login-service";
import { GOOGLE_CONFIG } from "./impl/google/google-config";
import { FACEBOOK_CONFIG } from "./impl/facebook/facebook-config";
import { UserDetails } from "./user-details";

const serviceConfigMap: Map<InjectionToken<any>, Type<LoginService>> = new Map([
    [GOOGLE_CONFIG, GoogleLoginService as Type<LoginService>],
    [FACEBOOK_CONFIG, FacebookLoginService as Type<LoginService>]
]);

@Injectable({
    providedIn: "root"
})
export class SocialLoginService {
    private _loginStatus: GlobalLoginStatus = {};
    private readonly _loginStatusSubject: Subject<GlobalLoginStatus> = new BehaviorSubject(this._loginStatus);
    private readonly _serviceMap: Map<string, LoginService>;

    constructor(@Optional() private readonly _config: LoginServiceConfig, injector: Injector) {
        if (!this._config) throw new Error("Please specify a provider for LoginServiceConfig()");

        const configuredServices = Array.from(serviceConfigMap.entries())
            .map(([configToken, type]) => [injector.get(configToken, null), type])
            .filter(([config, _]) => config)
            .map(([_, type]) => injector.get(type as Type<LoginService>));

        this._serviceMap = new Map(
            configuredServices.map((service) =>
                    [service.id, service] as [string, LoginService]));
        configuredServices.forEach(service =>
                service.loginStatus().subscribe(loginStatus =>
                        this._updateLoginStatus(service.id, loginStatus)));
    }

    impl(id: string): LoginService {
        const service = this._serviceMap.get(id);
        if (!service) throw new Error(`Service ${id} is not configured, check config provider.`);
        return service;
    }

    login(impl: string): Observable<LoginToken> {
        return this.impl(impl).login();
    }

    loginStatus(): Observable<GlobalLoginStatus> {
        return this._loginStatusSubject.asObservable();
    }

    /** Convenience method that logs the user in and immediately fetches user details in on run. */
    loginWithUserDetails(impl: string): Observable<[LoginToken, UserDetails]> {
        return this.impl(impl).loginWithUserDetails();
    }

    logout(impl: string): Observable<boolean> {
        return this.impl(impl).logout();
    }

    userDetails(impl: string, loginToken: LoginToken): Observable<UserDetails> {
        return this.impl(impl).userDetails(loginToken);
    }

    private _updateLoginStatus(id: any, loginStatus: LoginToken | null) {
        this._loginStatus = Object.assign({}, this._loginStatus, {[id]: loginStatus});
        this._loginStatusSubject.next(this._loginStatus);
    }
}
