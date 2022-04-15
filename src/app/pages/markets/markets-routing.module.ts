import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MarketsComponent} from "./markets.component";

const routes: Routes = [
  {path: '', component: MarketsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MarketsRoutingModule {
}
