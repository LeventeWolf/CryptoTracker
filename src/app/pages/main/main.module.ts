import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {MainRoutingModule} from './main-routing.module';
import {CryptoTableComponent} from '../shared/crypto-table/crypto-table.component';
import {CarouselComponent} from './carousel/carousel.component';
import {RoundNumberPipe} from '../../shared/pipes/round-number.pipe';
import {MatButtonModule} from "@angular/material/button";
import {NumberWithCommasPipe} from "../../shared/pipes/number-with-commas.pipe";


@NgModule({
  declarations: [
    CarouselComponent,
    CryptoTableComponent,
    RoundNumberPipe,
    NumberWithCommasPipe
  ],
  exports: [
    CarouselComponent,
    CryptoTableComponent,
    MatButtonModule,
    RoundNumberPipe,
    NumberWithCommasPipe
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
  ]
})

export class MainModule {}
