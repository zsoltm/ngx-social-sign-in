ngx-Social-Sign-In
==================

Social sing-in module for Angular that supports Facebook, Google and other providers in the near future.

Check the [demo app][demo-app]!

Design gooals are

+ make it lazy, do not load the various 3rd API scripts until it's necessary;
+ make it possible to fetch user details in either server side or client side;
+ events for both provider specific and global sign-in status;
+ clean API;
+ use the 3rd party provided API whenever possible.

Supported providers:

+ Facebook
+ Google

Planned support:

+ Twitter
+ Github
+ Microsoft

Usage
-----

First as usual add [`ngx-social-sign-in`][npm-page] to your project as a dependency.

With NPM:

``` bash
npm install --save "ngx-social-sign-in"
```

or with yarn:

``` bash
yarn add "ngx-social-sign-in"
```

Once you have the dependencies the main module has to be imported in your app's module, and you need to provide a configuration for
each 3rd party provider you want to use:

``` typescript
@NgModule({
    imports: [ SocialSignInModule /* , ... */ ], // import module
    providers: [{
      provide: SignInServiceConfig,
      useValue: {
        providers: {
          facebook: { appId: "... your app id ..." },
          google: { client_id: "[your client id].apps.googleusercontent.com" } // ,
          // other providers...
        }
      } as SignInServiceConfig
    }],    
});
```

Then in a component for example you could inject the main `SignInService` and subscribe to the status:

``` typescript
import { SocialSignInService, GlobalSignInStatus } from "ngx-social-sign-in";

@Component({ /* ... */ })
export class AppComponent implements OnInit, OnDestroy {
    constructor(private readonly _signInService: SocialSignInService) {}

    ngOnInit() {
        this._signInStatus = this._signInService.signInStatus().subscribe((status) => { // as GlobalSignInStatus
            // do something with the status e.g. submit it to backend to obtain a longer term access token
            // in exchange for lets say a JWT token.
        });
    }

    /** Don't forget unsubscribe, unless you'll leave a memory leak: */
    ngOnDestroy() {
        if (this._signInStatus) this._signInStatus.unsubscribe();
    }
}
```

The status is stream which emits a new `SignInStatus` value on every change, e.g. when the user logs in or logs out.
It has a key for each configured provider, so for instance it could look like this:

``` json
{
  "google": {
    "id": "eyJhbGciOiJSU ...",
    "token": "ya29.GlwEBpBnVddU .... Jrq8QPYl3lx5f_H3vVFNknD3F0"
  },
  "facebook": {
    "id": "4444444444444444",
    "token": "EAAe ... BgZDZD"
  }
}
```

To initiate a sign-in with a particular provider just call `signIn()` on a `SignInService` which can be obtained
from the main `SocialSignInService`:

``` typescript
import { SocialSignInService, FacebookSignInService } from "social-sign-in";

@Component({ /* ... */ })
export class AppComponent {
    constructor(private readonly _signInService: SocialSignInService) {}

    signInWithFacebook() {
        this._signInService.impl(FacebookSignInService.ID).signIn()
            .subscribe((signInToken) => { /* ... */ });
    }
}

```

... or the particular implementation can be also injected to the component, and can be used directly:

``` typescript
import { FacebookSignInService } from "social-sign-in";

@Component({ /* ... */ })
export class GoogleSignInComponent {
    constructor(private readonly _googleSignInService: GoogleSignInService) {} // service injected directly

    signIn() {
        this._googleSignInService.signIn().subscribe((signInToken) => { /* ... */ });
    }
}
```

Feel free to play around with the [demo application][demo-app] in the repo.

Configuration
-------------

### Facebook

Apart from the usual configuration make sure you configure URIs properly:

1. Go to your facebook app console
2. Go to Settings -> Basic. In Site URL type your url, even if localhost. For example: `http://localhost:4200`
3. Go to Settings -> Advanced. In Valid OAuth redirect URIs type your url, even if localhost. For example: `http://localhost:4200`

Otherwise you might experience weird issues, like redirects to the facebook home page.

Development
-----------

Requirements:

+ regular Angular development dependencies
+ [yarn][yarn] package manager

It's a monorepo; with an Angular test application, after unchecking run

    git submodules update # this will get the spectre CSS framework for demo app
    yarn install --frozen-lockfile # install dependencies
    yarn ng build social-sign-in # build module in /dist
    yarn start # launch the example application

[yarn]: https://yarnpkg.com/
[demo-app]: https://zsoltm.github.io/ngx-social-sign-in/testbed/
