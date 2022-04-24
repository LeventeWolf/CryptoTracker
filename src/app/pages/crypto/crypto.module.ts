import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CryptoRoutingModule} from "./crypto-routing.module";
import {InfoComponent} from './info/info.component';
import {TradeComponent} from './trade/trade.component';
import {MatIconModule} from "@angular/material/icon";
import {ReactiveFormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatInputModule} from "@angular/material/input";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {SnackbarSuccessComponent} from "../shared/snackbar/snackbar-success.component";
import {SnackbarErrorComponent} from "../shared/snackbar/snackbar-error.component";

@NgModule({
  declarations: [
    InfoComponent,
    TradeComponent,
    SnackbarSuccessComponent,
    SnackbarErrorComponent,
  ],
  exports: [
    InfoComponent,
    TradeComponent,
  ],
  imports: [
    CommonModule,
    CryptoRoutingModule,
    MatIconModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatSnackBarModule
  ]
})
export class CryptoModule { }
