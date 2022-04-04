import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { CryptoTabelComponent } from './crypto-tabel/crypto-tabel.component';
import { CarouselComponent } from './carousel/carousel.component';


@NgModule({
  declarations: [
    CryptoTabelComponent,
    CarouselComponent
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
