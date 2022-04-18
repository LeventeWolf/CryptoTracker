import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MainComponent} from "../main/main.component";
import {CryptoComponent} from "./crypto.component";

const routes: Routes = [
  { path: '', component: CryptoComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CryptoRoutingModule { }
