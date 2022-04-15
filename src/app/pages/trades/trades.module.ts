import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TradesRoutingModule } from './trades-routing.module';
import { TradesComponent } from './trades.component';


@NgModule({
  declarations: [
    TradesComponent
  ],
  imports: [
    CommonModule,
    TradesRoutingModule
  ]
})
export class TradesModule { }
