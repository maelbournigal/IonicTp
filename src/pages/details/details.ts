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
  inDb: number;

  constructor(public navCtrl: NavController, public navParams: NavParams, private dbProvider: DbProvider) {
    this.movie = navParams.get('movie');
    console.log(this.movie)
  }

  ionViewDidLoad() {

  }
  ionViewDidEnter(){
    this.isFav()
  }

  generateQrCode(){
    this.navCtrl.push(QrCodePage,this.movie);
  }

  saveAsFav(){
    this.dbProvider.addFavoris(this.movie);
    this.isFav();
  }

  isFav(){
    this.dbProvider.getMovie(this.movie.idMovie)
      .then((res)=>{
        if (res.rows.length > 0){
          this.inDb = 1;
        }else{
          this.inDb = 0;
        }
      })
      .catch(
        (e)=>{
          console.log(JSON.stringify(e))
        }
      );
  }
  removeFav(){
    this.dbProvider.removeFav(this.movie);
    this.isFav();
  }
}
