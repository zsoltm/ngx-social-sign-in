/// <reference types="facebook-js-sdk"/>

import { FacebookConfig } from "./facebook-config";
import { FacebookSdk } from "./facebook-sdk";
import { Observable, from } from "rxjs";

// Check https://developers.facebook.com/docs/graph-api/changelog/
const FB_API_VERSION = "v3.0";
const FB_API_SCRIPT_ID = "facebook-jssdk";

const createInitParams = (config: FacebookConfig): fb.InitParams => {
    const initParams: fb.InitParams = {
        appId: config.appId,
        version: FB_API_VERSION
    };
    if (config.cookie) initParams.cookie = config.cookie;
    if (config.xfbml) initParams.xfbml = config.xfbml;
    return initParams;
};

const loadFacebookSdkScript = (document: Document, url: string) => {
    if (document.getElementById(FB_API_SCRIPT_ID)) return;
    const js = document.createElement("script") as HTMLScriptElement;
    js.id = FB_API_SCRIPT_ID;
    js.src = url;
    document.body.appendChild(js);
};

export class FacebookSdkWrapper {
    private readonly _url: string;
    private readonly _initParams: fb.InitParams;
    private _sdk?: Observable<FacebookSdk>;

    constructor(
        private readonly _config: FacebookConfig,
        private readonly _document: Document
    ) {
        this._url =
            `https://connect.facebook.net/${_config.language || "en_US"}/${_config.debug ? "sdk/debug.js" : "sdk.js"}`;
        this._initParams = createInitParams(_config);
    }

    get sdk(): Observable<FacebookSdk> {
        return this._sdk || this._loadSdk();
    }

    private _loadSdk(): Observable<FacebookSdk> {
        loadFacebookSdkScript(this._document, this._url);
        const sdkPromise: Promise<FacebookSdk> = new Promise((resolve) => {
            Object.assign(window, {fbAsyncInit: () => {
                FB.init(this._initParams);
                resolve(new FacebookSdk());
            }});
        });
        return (this._sdk = from(sdkPromise));
    }
}
