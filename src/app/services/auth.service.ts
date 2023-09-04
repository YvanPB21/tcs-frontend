import { Injectable } from '@angular/core';
import {AuthUser} from "../models/auth-user";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authURL = 'http://localhost:8080/';
  constructor(private httpClient: HttpClient) { }

  public login(user: AuthUser): Observable<any> {
    return this.httpClient.post(this.authURL + 'authenticate', user);
  }
}
