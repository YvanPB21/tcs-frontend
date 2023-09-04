import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {headers} from "./utils";

@Injectable({
  providedIn: 'root'
})
export class ExchangeRateService {

  URL = 'http://localhost:8080/exchange-rate';
  constructor(private httpClient: HttpClient) { }

  public addExchangeRate(req: any):Observable<any>{
    console.log(req)
    return this.httpClient.post(this.URL, req, headers);
  }

  public getAllRates():Observable<any>{
    return this.httpClient.get(this.URL,headers);
  }
}
