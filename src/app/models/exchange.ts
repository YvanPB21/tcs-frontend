export class Exchange{
  originCurrencyCode: string
  destinationCurrencyCode: string
  amount: number


  constructor(originCurrencyCode: string, destinationCurrencyCode: string, amount: number) {
    this.originCurrencyCode = originCurrencyCode;
    this.destinationCurrencyCode = destinationCurrencyCode;
    this.amount = amount;
  }
}
