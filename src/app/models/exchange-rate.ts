export class ExchangeRate{
  originCurrencyCode: string;
  destinationCurrencyCode:string;
  rate: number;


  constructor(originCurrencyCode: string, destinationCurrencyCode: string, rate: number) {
    this.originCurrencyCode = originCurrencyCode;
    this.destinationCurrencyCode = destinationCurrencyCode;
    this.rate = rate;
  }
}
