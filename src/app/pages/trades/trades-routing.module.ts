import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {TradesComponent} from "./trades.component";

const routes: Routes = [
  { path: '', component: TradesComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TradesRoutingModule { }
