import { Injectable } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private keycloak: KeycloakService) {}

  public login(): void {
    this.keycloak.login();
  }

  public logout(): void {
    this.keycloak.logout(window.location.origin);
  }

  public getUsername(): any {
     return this.keycloak.getUsername();
  }

  public isLoggedIn(): boolean {
    return this.keycloak.isLoggedIn();
  }

  public async getToken(): Promise<string> {
    await this.keycloak.updateToken(10); 
    return this.keycloak.getToken();
  }

  public updateToken(minValidity: number = 5): Promise<boolean> {
    return this.keycloak.updateToken(minValidity);
  }
}