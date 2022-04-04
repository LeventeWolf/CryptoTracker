import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'roundNumber'
})
export class RoundNumberPipe implements PipeTransform {

  transform(value: number, places=2): unknown {
    return this.round(value, places);
  }

  round(value: number, places: number): number {
    return +(Math.round(Number(value + "e+" + places))  + "e-" + places);
  }

}
