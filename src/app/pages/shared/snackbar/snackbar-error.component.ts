import { Component } from '@angular/core';

@Component({
  selector: 'app-success',
  template: '<span class="wrapper">\n' +
    '  Something went wrong! \n' +
    '</span>',
  styles: [
    `
      $coin-green: #2EBD85;
      $coin-red: #F6465D;

      .wrapper {
        color: $coin-red;
        font-weight: 600;
      }
    `,
  ],
})
export class SnackbarErrorComponent {}
