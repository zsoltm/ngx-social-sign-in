import { Injectable, Inject, Optional, Injector, Type } from "@angular/core";
import { Observable, BehaviorSubject, Subject } from "rxjs";
import { GlobalLoginStatus } from "./global-login-status";
import { LoginServiceConfig } from "./login-service-config";
import { services } from "./impl";
import { LoginService } from "./login-service";
import { Services } from "@angular/core/src/view";
import { LoginToken } from "./login-token";

@Injectable()
export class SocialLoginService {
    private _loginStatus: GlobalLoginStatus = {};
    private readonly _loginStatusSubject: Subject<GlobalLoginStatus> = new BehaviorSubject(this._loginStatus);
    private readonly _serviceMap: Map<string, LoginService>;

    constructor(@Optional() private readonly _config: LoginServiceConfig, injector: Injector) {
        if (!this._config) throw new Error("Please specify a provider for LoginServiceConfig()");
        const configuredServices = services.map((serviceType) =>
                    injector.get(serviceType))
            .filter((service) => service);
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

    _updateLoginStatus(id: any, loginStatus: LoginToken): any {
        this._loginStatus = Object.assign({}, this._loginStatus, {[id]: loginStatus});
        this._loginStatusSubject.next(this._loginStatus);
    }
}
