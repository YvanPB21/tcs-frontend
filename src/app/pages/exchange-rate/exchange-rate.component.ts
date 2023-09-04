import {Component, OnInit} from '@angular/core';
import {ExchangeRateService} from "../../services/exchange-rate.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ExchangeRate} from "../../models/exchange-rate";

@Component({
  selector: 'app-exchange-rate',
  templateUrl: './exchange-rate.component.html',
  styleUrls: ['./exchange-rate.component.css']
})
export class ExchangeRateComponent implements OnInit {
  form!: FormGroup;
  displayedColumns: string[] = ['originCurrency', 'destinationCurrency', 'rate'];
  dataSource = [];
  originCurrencyCode!: string;
  destinationCurrencyCode!: string;
  rate!: string;
  newExchangeRate!: ExchangeRate

  constructor(
    private exchangeRateService: ExchangeRateService,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar
  ) {
    this.buildForm();
  }

  ngOnInit() {
    this.fillTable()
  }

  openSnackBar(message: string) {
    this.snackBar.open(message);
  }

  fillTable() {
    this.exchangeRateService.getAllRates().subscribe(
      data => {
        this.dataSource = data;
      }
    );
  }

  addExchangeRate() {
    const formData = this.form.value;
    console.log(formData)
    this.originCurrencyCode = formData.originCurrencyCode
    this.destinationCurrencyCode = formData.destinationCurrencyCode
    this.rate = formData.rate
    this.newExchangeRate = new ExchangeRate(this.originCurrencyCode,
      this.destinationCurrencyCode,
      parseFloat(this.rate))
    this.exchangeRateService.addExchangeRate(this.newExchangeRate).subscribe(
      data => {
        this.openSnackBar("Success")
        this.buildForm()
        this.fillTable()
      },
      (error) => {
        this.openSnackBar("Error at exchange rate");
      }
    )
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      originCurrencyCode: [null, [Validators.required]],
      destinationCurrencyCode: [null, [Validators.required]],
      rate: [null, [Validators.required]],
    });
  }


}
