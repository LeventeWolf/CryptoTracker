import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TradesRoutingModule } from './trades-routing.module';
import { TradesComponent } from './trades.component';
import {MatTableModule} from "@angular/material/table";
import {MatDividerModule} from "@angular/material/divider";
import {MatListModule} from "@angular/material/list";


@NgModule({
  declarations: [
    TradesComponent
  ],
  imports: [
    CommonModule,
    TradesRoutingModule,
    MatTableModule,
    MatDividerModule,
    MatListModule
  ]
})
export class TradesModule { }
