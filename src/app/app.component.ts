import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { OAuthService } from 'angular-oauth2-oidc';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'angular-authentication-demo';
  isAuthorized = this.oAuthService.hasValidAccessToken();

  constructor(private oAuthService : OAuthService) {
    
  }

  login() {
    this.oAuthService.initLoginFlow();
  }

  logout() {
    this.oAuthService.revokeTokenAndLogout();
  }

  get username() {
    var claims = this.oAuthService.getIdentityClaims();
    if (!claims) return null;
    return claims['username'];
  }

  get givenName() {
    var claims = this.oAuthService.getIdentityClaims();
    if (!claims) return null;
    return claims['given_name'];
  }

  get familyName() {
    var claims = this.oAuthService.getIdentityClaims();
    if (!claims) return null;
    return claims['family_name'];
  }

  get idToken() {
    return this.oAuthService.getIdTokenExpiration();
  }
}
