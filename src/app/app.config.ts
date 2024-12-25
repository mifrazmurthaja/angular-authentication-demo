import { ApplicationConfig, APP_INITIALIZER } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideOAuthClient, OAuthService, AuthConfig } from 'angular-oauth2-oidc';

import { routes } from './app.routes';

export const authConfig: AuthConfig = {
  issuer: 'https://api.asgardeo.io/t/mifrazmurthaja/oauth2/token',
  //issuer: 'https://uaepass.test:9443/oauth2/token',
  redirectUri: window.location.origin,
  clientId: 'sq4ktPY4lnEDBj8u5kImfHi4nSca',
  //clientId: 'fEmvZ9EP8nlc8dXl3BHC924xFXUa',
  responseType: 'code',
  scope: 'email openid profile internal_login',
  strictDiscoveryDocumentValidation: false,
};

function initializeOAuth(oauthService: OAuthService): () => Promise<void> {
  return () => {
    oauthService.configure(authConfig);
    //oauthService.setupAutomaticSilentRefresh();
    oauthService.setStorage(sessionStorage);
    return oauthService.loadDiscoveryDocumentAndTryLogin().then(() => {});
  };
}

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes),
    provideHttpClient(withInterceptorsFromDi()),
    provideOAuthClient({
      resourceServer: {
          allowedUrls: ['https://api.asgardeo.io'],
          sendAccessToken: true
      }
    }),
    {
      provide: APP_INITIALIZER,
      useFactory: initializeOAuth,
      deps: [OAuthService],
      multi: true
    }
  ]
};
