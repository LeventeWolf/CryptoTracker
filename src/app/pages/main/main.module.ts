import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { CryptoTabelComponent } from './crypto-tabel/crypto-tabel.component';
import { CarouselComponent } from './carousel/carousel.component';
import { RoundNumberPipe } from '../../shared/pipes/round-number.pipe';


@NgModule({
  declarations: [
    CryptoTabelComponent,
    CarouselComponent,
    RoundNumberPipe
  ],
  exports: [
    CarouselComponent,
    CryptoTabelComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule
  ]
})

// @ts-ignore
export class MainModule {}
// @ts-ignore
