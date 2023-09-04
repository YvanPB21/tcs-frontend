import {Injectable} from '@angular/core';

const TOKEN_KEY = 'token';
const USER_KEY = 'user';
@Injectable({
  providedIn: 'root'
})
export class TokenService {

  roles: Array<string> = [];

  constructor() { }

  public setToken(token: string): void {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string | null {
    return sessionStorage.getItem(TOKEN_KEY) ;
  }


  public setUserName(userName: string): void {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, userName);
  }

  public getUserName(): string | null {
    return sessionStorage.getItem(USER_KEY); // Devuelve una cadena vacía si el valor es nulo
  }


  public logOut(): void {
    window.sessionStorage.clear();
  }
}
