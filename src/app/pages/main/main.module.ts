import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { CryptoTableComponent } from './crypto-table/crypto-table.component';
import { CarouselComponent } from './carousel/carousel.component';
import { RoundNumberPipe } from '../../shared/pipes/round-number.pipe';


@NgModule({
  declarations: [
    CryptoTableComponent,
    CarouselComponent,
    RoundNumberPipe
  ],
  exports: [
    CarouselComponent,
    CryptoTableComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
  ]
})

// @ts-ignore
export class MainModule {}
// @ts-ignore
