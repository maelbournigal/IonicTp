import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {BarcodeScanner} from "@ionic-native/barcode-scanner";
import {MovieApiProvider} from "../../providers/movie-api/movie-api";

/**
 * Generated class for the ScanQrCodePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-scan-qr-code',
  templateUrl: 'scan-qr-code.html',
})
export class ScanQrCodePage {
  movie = {

  };

  constructor(public navCtrl: NavController, public navParams: NavParams, private barcodeScanner: BarcodeScanner, public movieApiProvider: MovieApiProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ScanQrCodePage');
  }

  scanQrCode(){
    this.barcodeScanner.scan()
      .then(barcodeData => {
        this.movieApiProvider.getOneMovie(parseInt(barcodeData.text)).subscribe((data => {
          this.movie = data;
        }));
      })
      .catch(err=>{
        alert(err)
      })
  }
}
