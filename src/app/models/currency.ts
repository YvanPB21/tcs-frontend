export class Currency{
  code: string;
  name: string;
  symbol: string;


  constructor(code: string, name: string, symbol: string) {
    this.code = code;
    this.name = name;
    this.symbol = symbol;
  }
}
