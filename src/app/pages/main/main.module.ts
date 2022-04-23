import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {MainRoutingModule} from './main-routing.module';
import {CryptoTableComponent} from '../shared/crypto-table/crypto-table.component';
import {CarouselComponent} from './carousel/carousel.component';
import {RoundNumberPipe} from '../../shared/pipes/round-number.pipe';
import {MatButtonModule} from "@angular/material/button";


@NgModule({
  declarations: [
    CarouselComponent,
    CryptoTableComponent,
    RoundNumberPipe,
  ],
  exports: [
    CarouselComponent,
    CryptoTableComponent,
    MatButtonModule,
    RoundNumberPipe,
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
  ]
})

export class MainModule {}
