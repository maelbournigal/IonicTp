import { Component } from '@angular/core';

/**
 * Generated class for the QrCodeComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'qr-code',
  templateUrl: 'qr-code.html'
})
export class QrCodeComponent {

  public myQrCode: string=null;

  constructor(movie) {
    this.myQrCode=JSON.stringify(movie);
    console.log(this.myQrCode);
  }

}
