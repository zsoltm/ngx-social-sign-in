/// <reference types="facebook-js-sdk"/>

import { FacebookConfig } from "./facebook-config";
import { LoginService } from "../../login-service";
import { Observable, BehaviorSubject } from "rxjs";
import { LoginStatus } from "../../login-status";

// Check https://developers.facebook.com/docs/graph-api/changelog/
const FB_API_VERSION = "v3.0";

export class FacebookLoginService implements LoginService {
    static readonly ID = "facebook";
    readonly id = FacebookLoginService.ID;

    private readonly _initParams: fb.InitParams;
    private readonly _url: string;

    constructor(document: Document, _config: FacebookConfig) {
        this._initParams = this._createInitParams(_config);
        this._url = `https://connect.facebook.net/${_config.language || "en_US"}/${
            _config.debug ? "sdk/debug.js" : "sdk.js"}`;
    }

    loginStatus(): Observable<LoginStatus> {
        return new BehaviorSubject({} as LoginStatus).asObservable();
    }

    private _addAsyncCallbackHookToWindow(window: Window) {
        // window["fbAsyncInit"] = () => {
        // }
    }

    private _createInitParams(config: FacebookConfig): fb.InitParams {
        const initParams: fb.InitParams = {
            appId: config.appId,
            version: FB_API_VERSION
        };
        if (config.cookie) initParams.cookie = config.cookie;
        if (config.xfbml) initParams.xfbml = config.xfbml;
        return initParams;
    }
}
