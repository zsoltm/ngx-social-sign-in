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

const serviceConfigMap: Map<InjectionToken<any>, Type<LoginService>> = new Map([
    [GOOGLE_CONFIG, GoogleLoginService as Type<LoginService>],
    [FACEBOOK_CONFIG, FacebookLoginService as Type<LoginService>]
]);

@Injectable()
export class SocialLoginService {
    private _loginStatus: GlobalLoginStatus = {};
    private readonly _loginStatusSubject: Subject<GlobalLoginStatus> = new BehaviorSubject(this._loginStatus);
    private readonly _serviceMap: Map<string, LoginService>;

    constructor(@Optional() private readonly _config: LoginServiceConfig, injector: Injector) {
        if (!this._config) throw new Error("Please specify a provider for LoginServiceConfig()");

        const configuredServices = Array.from(serviceConfigMap.entries())
            .map(([configToken, type]) => [injector.get(configToken, null), type])
            .filter(([config, type]) => config)
            .map(([_config, type]) => injector.get(type) as LoginService);

        this._serviceMap = new Map(
            configuredServices.map((service) =>
                    [service.id, service] as [string, LoginService]));
        configuredServices.forEach(service =>
                service.loginStatus().subscribe(loginStatus =>
                        this._updateLoginStatus(service.id, loginStatus)));
    }

    loginStatus(): Observable<GlobalLoginStatus> {
        return this._loginStatusSubject.asObservable();
    }

    impl(id: string): LoginService {
        const service = this._serviceMap.get(id);
        if (!service) throw new Error(`Service ${id} is not configured, check config provider.`);
        return service;
    }

    _updateLoginStatus(id: any, loginStatus: LoginToken | null) {
        this._loginStatus = Object.assign({}, this._loginStatus, {[id]: loginStatus});
        this._loginStatusSubject.next(this._loginStatus);
    }
}
