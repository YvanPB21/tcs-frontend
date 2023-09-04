import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators} from "@angular/forms";
import {Exchange} from "../../models/exchange";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ExchangeService} from "../../services/exchange.service";
import {CurrencyService} from "../../services/currency.service";

@Component({
  selector: 'app-exchange',
  templateUrl: './exchange.component.html',
  styleUrls: ['./exchange.component.css']
})
export class ExchangeComponent implements OnInit {
  form!: FormGroup;
  displayedColumns: string[] = ['originCurrencyCode', 'destinationCurrencyCode', 'amount', 'amountWithExchange', 'type'];
  dataSource = [];
  originCurrencyCode!: string;
  destinationCurrencyCode!: string;
  amount!: string;
  exchange!: Exchange
  currencies: any[] = []

  constructor(
    private exchangeService: ExchangeService,
    private currencyService: CurrencyService,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar
  ) {
    this.form = this.formBuilder.group({
      originCurrencyCode: ['', Validators.required],
      destinationCurrencyCode: ['', Validators.required],
      amount: ['', Validators.required],
    }, {
      validators: this.currencyCodeValidator
    });
    // this.buildForm()
  }

  currencyCodeValidator(control: AbstractControl): ValidationErrors | null {
    const originCurrencyCode = control.get('originCurrencyCode')?.value;
    const destinationCurrencyCode = control.get('destinationCurrencyCode')?.value;
    if (originCurrencyCode.length < 1 || destinationCurrencyCode.length < 1)
      return null;
    if (originCurrencyCode === destinationCurrencyCode) {
      return {sameCurrencyCode: true};
    }

    return null;
  }

  openSnackBar(message: string) {
    this.snackBar.open(message);
  }

  ngOnInit() {
    this.fillTable()
    this.fillSelectCurrency()
  }

  fillSelectCurrency() {
    this.currencyService.getAllCurrencies().subscribe(
      data => {
        this.currencies = data;
      }
    )
  }

  fillTable() {
    this.exchangeService.getAllExchanges().subscribe(
      data => {
        this.dataSource = data;
      }
    );
  }

  doExchange() {
    if (this.form.valid) {
      const formData = this.form.value;
      this.originCurrencyCode = formData.originCurrencyCode
      this.destinationCurrencyCode = formData.destinationCurrencyCode
      this.amount = formData.amount
      this.exchange = new Exchange(this.originCurrencyCode, this.destinationCurrencyCode, parseFloat(this.amount))
      this.exchangeService.doExchange(this.exchange).subscribe(
        data => {
          this.openSnackBar("Success")
          this.buildForm()
          this.fillTable()
        },
        (error) => {

          this.openSnackBar(error.error.message);
        }
      )
    }
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      originCurrencyCode: ['', [Validators.required]],
      destinationCurrencyCode: ['', [Validators.required]],
      amount: ['', [Validators.required]],
    });
  }
}
