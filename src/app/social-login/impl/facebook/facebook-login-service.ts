import { Injectable, Optional } from "@angular/core";
import { LoginServiceConfig } from "../../login-service-config";
import { FacebookConfig } from "./facebook-config";
import { LoginService } from "../../login-service";
import { Observable, BehaviorSubject } from "rxjs";
import { LoginStatus } from "../../login-status";

@Injectable()
export class FacebookLoginService implements LoginService {
    static readonly ID = "facebook";
    readonly id = FacebookLoginService.ID;

    constructor(@Optional() window: Window, private readonly _config: FacebookConfig) {
        console.log("Facebook Config: %o", this._config);
    }

    loginStatus(): Observable<LoginStatus> {
        return new BehaviorSubject({} as LoginStatus).asObservable();
    }

    private async _addAsyncCallbackHookToWindow() {
        // window["fbAsyncInit"] = () => {
        // }
    }
}
