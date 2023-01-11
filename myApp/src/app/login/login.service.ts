import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Token } from '../database-list/database';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(
    public httpClient: HttpClient,
    private cookieService: CookieService
  ) {}

  request_login(email: string, password: string): void {
    const body = {
      email: email,
      password: password,
    };
    const result = this.httpClient.post<Token>(
      'http://localhost:8080/v1/users/login',
      body
    );
    result.subscribe((data: Token) => {
      this.cookieService.set('Anywhere-token', data.token);
    });
  }

  isLoggedIn(): boolean {
    return this.cookieService.check('Anywhere-token');
  }
  logOut(): void {
    this.cookieService.deleteAll();
  }
}
