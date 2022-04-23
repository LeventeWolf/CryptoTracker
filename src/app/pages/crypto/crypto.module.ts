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

@NgModule({
  declarations: [
    InfoComponent,
    TradeComponent,
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
    MatInputModule
  ]
})
export class CryptoModule { }
