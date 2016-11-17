[**Contributors needed**: I'm looking for people that are willing to help me maintain and improve this plugin.](https://github.com/matik12/aurelia-oauth/issues/1)

---

#### NPM package [aurelia-oauth](https://www.npmjs.com/package/aurelia-oauth)
#### Setup using Google API -> [Live demo](https://matik12.github.io/aurelia-basic-app-skeleton/)

## What is aurelia-oauth plugin?
aurelia-oauth is a plugin for [Aurelia](http://aurelia.io/) to provide support of user authorization using OAuth 2.0 Authorization Framework. 

aurelia-oauth has very similar functionality as [ADALjs library] (https://github.com/AzureAD/azure-activedirectory-library-for-js) and can be easily configured to integrate with OAuth2 APIs such as Azure Active Directory, Google etc.

aurelia-oauth plugin automatically uses 'Bearer' JWT (JSON WEB TOKEN) tokens to send requests to secured APIs by adding Authorization header. The underlying token is **never stored** on the client due to sensitive data security. Use this page - [JWT](https://jwt.io/) to decode tokens and investigate claims.   

![Authentication header](./pictures/jwt_token.png)

This plugin implements only **OAuth implicit grant flow**, which is the recommended approach for both client side SPA applications and mobile apps. In this case, application does not need to supply login page and can leverage external login page with Single Sign-On. Plugin relies on simple page redirects(**no popups!**) and therefore can be seamlessly used on mobile devices. Animation below shows plugin and its flow in action.

![OAuth Implicit Grant Flow](./pictures/oauth_flow.gif)

# Installation prerequisites
Obviously, you need to have installed [NodeJs](https://nodejs.org/) and [Gulp](http://gulpjs.com/). aurelia-oauth was based on [Aurelia plugin](https://github.com/aurelia/skeleton-plugin) and requires only standard Aurelia libraries. It's highly recommended to use JSPM for package managment.

# Installation
```
jspm install aurelia-oauth
```
Using Npm:
```
npm install aurelia-oauth --save
```
Using typescript you can install definitions:
```
typings install github:matik12/aurelia-oauth --save --global
```

# Usage guide

## Update the Aurelia configuration file

In your Aurelia configuration file(most commonly main file) add the plugin and provide OAuth endpoint configuration :
```js
export function configure(aurelia: Aurelia) {
  aurelia.use
    .standardConfiguration()
    .developmentLogging()
    .plugin('aurelia-oauth', configureOauth);

  aurelia.start().then(() => aurelia.setRoot());
}
```
The configuration for Azure Active Directory is very simple, because it uses default parameter values in plugin internal set up. Just need to replace {tenantId} and {clientId} with your Azure Application real values and you are up and running.
```js
function configureOauth(oauthService: IOAuthConfig) {
  oauthService.configure(
    {
      loginUrl: 'https://login.microsoftonline.com/{tenantId}/oauth2/authorize',
      logoutUrl: 'https://login.microsoftonline.com/{tenantId}/oauth2/authorize',
	  clientId: '{clientId}',
      alwaysRequireLogin: true
    });
}
```
The function below for OAuth configuration provides sample values of Google API authorization endpoint. This should all work in the local environment by using my test API endpoint if you choose to host web app using  the following address - http://localhost:9000/
```js
function configureOauth(oauthService: IOAuthConfig, oauthTokenService: IOAuthTokenConfig) {
  oauthService.configure(
    {
      loginUrl: 'https://accounts.google.com/o/oauth2/auth',
      logoutUrl: 'https://www.google.com/accounts/Logout?continue=https://appengine.google.com/_ah/logout',
      clientId: '215036514264-idvs69m8pitnqeec9oehc33sds59imhu.apps.googleusercontent.com',
      scope: 'https://www.googleapis.com/auth/userinfo.profile',
      alwaysRequireLogin: true,
      logoutRedirectParameterName: 'continue'
    });

  oauthTokenService.configure(
    {
      name: 'token id_token',
      urlTokenParameters: {
        idToken: 'id_token'
      }
    });
}
```

## Configure routing to use authentication

When setting configuration for aurelia-oauth plugin you can choose if you want to give only authenticated users access to your application or only in particular routes user login is required. 
```js
alwaysRequireLogin: true
```
Default value for the above property is false, but passing true value means, that application should require user login in all its routes except the particular route provide setting overriding this behavior. Every route in the application can configure setting to require authentication or not. This step is not necessary, but can be done as follows:
```js
{ route: 'users', name: 'users', moduleId: 'users', nav: true, title: 'Github Users', settings: { requireLogin: true } }
```
The **requireLogin** setting overrides global authentication configuration and can be set to true or false value if this is needed. In the example above users route can only be available for authenticated users.

## Add logout button

To provide logout functionality, simply add button or anchor to the html and bind it to the logout method in the backing the view-model as shown below.
```js
import {OAuthService} from 'aurelia-oauth';

@autoinject()
export class Navigation {
  constructor(private oauthService: OAuthService) { } 

  logout(): void {
    this.oauthService.logout();
  }
}
```

## Published events

This plugin also supports simple notification in the authentication process and broadcast an event is Aurelia's event aggregator when something important occurred. For instance, you might want to know that user has been authenticated to start some logic or that obtained token has expired to show proper message to the end user.
The supported events are as follows:

* login: `oauth:loginSuccess`
* invalid token (expired): `oauth:invalidToken`

If you are using Typescript, in definitions there are declared const properties for this events to use them when subscribing to an event. 
```js
import {OAuthService} from 'aurelia-oauth';

eventAggregator.subscribe(OAuthService.LOGIN_SUCCESS_EVENT, () => { ... });
```

## Browser support

This plugin should work with all modern browsers, although it is still in early phase and can contain few bugs. To support IE10 & IE11 you need to add the script tag to the head section of the main page(index.html) as shown below. It is related to the IE known-issue with # in URL and redirects. The following fix will not affect other correctly working browsers.
```js
<head>
	...
	<!-- Fix for IE bug with page reload when changing hash in url after redirect -->
	<script type="text/javascript">
		window.location.hash = window.location.hash;
	</script>
</head>
```

## Authentication class interface

```js
interface IOAuthService {
    config: IOAuthConfig;
    
    configure: (config: IOAuthConfig) => IOAuthConfig;

    isAuthenticated: () => boolean;
    login: () => void;
    logout: () => void;
    loginOnStateChange: (toState) => boolean;
    setTokenOnRedirect: () => void;
}

interface IOAuthTokenService {
    config: IOAuthTokenConfig;

    configure: (config: IOAuthTokenConfig) => IOAuthTokenConfig;

    isTokenValid: () => boolean;
    createToken: (urlTokenData: any) => IOAuthTokenData;
    setToken: (data: IOAuthTokenData) => void;
    getToken: () => IOAuthTokenData;
    removeToken: () => void; 
    getAuthorizationHeader: () => string;
}
```
More on this to be done soon...

## Plugin configuration parameters (config interfaces)

```js
interface IOAuthConfig {
    loginUrl: string;
    logoutUrl: string;
    clientId: string;
    logoutRedirectParameterName?: string;
    scope?: string;
    state?: string;
    redirectUri?: string;
    alwaysRequireLogin?: boolean;
}

interface IOAuthTokenConfig {
    name: string;
    urlTokenParameters?: {
        idToken: string;
        tokenType?: string;
    };
    expireOffsetSeconds?: number;
}
```

## Support for aurelia-fetch-client

Currently, aurelia-oauth provides automatic feature of adding authorization header to every request by using custom interceptor. To implement this, plugin uses **aurelia-http-client** which has support for cancelling requests in case when token has expired before request occurred. The following issue considering poor fetch API implementation will be investigated further in the future to adjust aurelia-oauth plugin. More on this to be done soon...