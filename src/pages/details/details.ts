import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {QrCodePage} from "../qr-code/qr-code";
import {DbProvider} from "../../providers/db/db";
import {Movie} from "../../models/movie";

/**
 * Generated class for the DetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-details',
  templateUrl: 'details.html',
})
export class DetailsPage {
  movie: Movie;

  constructor(public navCtrl: NavController, public navParams: NavParams, private dbProvider: DbProvider) {
    this.movie = navParams.get('movie');
  }

  ionViewDidLoad() {

  }

  generateQrCode(){
    this.navCtrl.push(QrCodePage,this.movie);
  }

  saveAsFav(){
    this.dbProvider.addFavoris(this.movie.id,this.movie.title);
  }

}
