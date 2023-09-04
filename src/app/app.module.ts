import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './pages/login/login.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatCardModule} from "@angular/material/card";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";
import {HttpClientModule} from "@angular/common/http";
import {RouterModule, RouterOutlet, Routes} from "@angular/router";
import { MainNavComponent } from './components/main-nav/main-nav.component';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatListModule} from "@angular/material/list";
import {MatSelectModule} from "@angular/material/select";
import {MatRadioModule} from "@angular/material/radio";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";
import {LayoutModule} from "@angular/cdk/layout";
import { CurrencyComponent } from './pages/currency/currency.component';
import {CurrencyService} from "./services/currency.service";
import {MatTableModule} from "@angular/material/table";
import { ExchangeRateComponent } from './pages/exchange-rate/exchange-rate.component';
import {ExchangeRateService} from "./services/exchange-rate.service";
import {MatDialogModule} from "@angular/material/dialog";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import { ExchangeComponent } from './pages/exchange/exchange.component';
import {ExchangeService} from "./services/exchange.service";

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'currencies', component: CurrencyComponent},
  {path: 'exchange-rate', component: ExchangeRateComponent},
  {path: 'exchange', component: ExchangeComponent},
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainNavComponent,
    CurrencyComponent,
    ExchangeRateComponent,
    ExchangeComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    MatCardModule,
    MatButtonModule,
    LayoutModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    FormsModule,
    MatRadioModule,
    ReactiveFormsModule,
    MatRadioModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTableModule,
    MatDialogModule,
    MatSnackBarModule
  ],
  providers: [CurrencyService,ExchangeRateService,ExchangeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
