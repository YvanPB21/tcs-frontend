import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {headers} from "./utils";
import {HttpClient} from "@angular/common/http";
import {Exchange} from "../models/exchange";

@Injectable({
  providedIn: 'root'
})
export class ExchangeService {
  URL = 'http://localhost:8080/exchange';

  constructor(private httpClient: HttpClient) { }
  public doExchange(req: Exchange): Observable<any> {
    return this.httpClient.post(this.URL , req, headers);
  }

  public getAllExchanges(): Observable<any> {
    return this.httpClient.get(this.URL, headers);
  }
}
