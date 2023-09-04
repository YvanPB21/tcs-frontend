import {Component, OnInit} from '@angular/core';
import {CurrencyService} from "../../services/currency.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Currency} from "../../models/currency";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-currency',
  templateUrl: './currency.component.html',
  styleUrls: ['./currency.component.css']
})
export class CurrencyComponent implements OnInit {
  form!: FormGroup;
  displayedColumns: string[] = ['code', 'name', 'symbol'];
  dataSource = [];
  code!: string;
  name!: string;
  symbol!: string;
  newCurrency!: Currency

  constructor(
    private currencyService: CurrencyService,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar
  ) {
    this.buildForm();
  }
  openSnackBar(message: string) {
    this.snackBar.open(message);
  }
  ngOnInit() {
    this.fillTable()
  }

  fillTable = () => {
    this.currencyService.getAllCurrencies().subscribe(
      data => {
        this.dataSource = data;
      }
    );
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      code: [null, [Validators.required]],
      name: [null, [Validators.required]],
      symbol: [null, [Validators.required]],
    });
  }

  addCurrency = () => {
    const formData = this.form.value;
    this.code = formData.code;
    this.name = formData.name;
    this.symbol = formData.symbol;

    this.newCurrency = new Currency(this.code, this.name, this.symbol);
    this.currencyService.addCurrency(this.newCurrency).subscribe(
      data => {
        this.openSnackBar("Success")
        this.buildForm()
        this.fillTable()
      },
      (error) => {
        this.openSnackBar("Error at register new currency");
      }
    )
  }

}
