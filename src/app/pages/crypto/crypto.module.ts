import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CryptoRoutingModule} from "./crypto-routing.module";
import {InfoComponent} from './info/info.component';
import {TradeComponent} from './trade/trade.component';

@NgModule({
  declarations: [
    InfoComponent,
    TradeComponent,
  ],
  exports: [
    InfoComponent,
  ],
  imports: [
    CommonModule,
    CryptoRoutingModule
  ]
})
export class CryptoModule { }
