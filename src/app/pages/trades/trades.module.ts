import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TradesRoutingModule } from './trades-routing.module';
import { TradesComponent } from './trades.component';
import {MatTableModule} from "@angular/material/table";


@NgModule({
  declarations: [
    TradesComponent
  ],
    imports: [
        CommonModule,
        TradesRoutingModule,
        MatTableModule
    ]
})
export class TradesModule { }
