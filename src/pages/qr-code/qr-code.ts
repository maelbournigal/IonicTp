import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the QrCodePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-qr-code',
  templateUrl: 'qr-code.html',
})
export class QrCodePage {

  movie={

  };

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.movie = navParams.data;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad QrCodePage');
  }
}
