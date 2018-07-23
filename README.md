Angular-Social-Login
====================

Social login module for Angular that supports Facebook, Google and other providers.

Design gooals are

+ make it lazy, not load the various 3rd API scripts until it's necessary;
+ make it possible to fetch user details in either server side or client side;
+ clean API.

Supported providers:

+ Facebook
+ Google

Planned support:

+ Twitter
+ Github
+ Microsoft

Development
-----------

It's a regular Angular application, after unchecking just run

    git submodules update # this will get spectre CSS framework
    yarn install --frozen-lockfile # install dependencies
    yarn start # launch the example application
