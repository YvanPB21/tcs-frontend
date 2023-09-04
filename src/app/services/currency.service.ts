import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {headers} from "./utils";

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {

  URL = 'http://localhost:8080/currency';

  constructor(private httpClient: HttpClient) {
  }

  public addCurrency(req: any): Observable<any> {
    return this.httpClient.post(this.URL + "/add", req, headers);
  }

  public getAllCurrencies(): Observable<any> {
    return this.httpClient.get(this.URL, headers);
  }
}
