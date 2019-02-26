import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {QrCodePage} from "../qr-code/qr-code";
import {DbProvider} from "../../providers/db/db";
import {Movie} from "../../models/movie";
import {MovieApiProvider} from "../../providers/movie-api/movie-api";
import {Subscription} from "rxjs";

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
  sub: Subscription;
  movie: Movie;
  inDb: number;
  movieInfo;

  constructor(public navCtrl: NavController, public navParams: NavParams, private dbProvider: DbProvider, private apiProvider: MovieApiProvider) {
    this.movie = navParams.get('movie');
    this.getMovie();
  }

  ionViewDidLoad() {

  }

  ionViewDidEnter(){
    this.isFav().catch((err) => {
      console.log(err)
    })
  }

  ionViewWillLeave(){
    this.sub.unsubscribe();
  }

  generateQrCode(){
    this.navCtrl.push(QrCodePage,this.movie).catch((err)=> {
      console.log(err);
    });
  }

  saveAsFav(){
    this.dbProvider.addFavoris(this.movie);
    this.isFav();
  }

  isFav(){
    return this.dbProvider.getMovie(this.movie.idMovie)
      .then((res)=>{
        if (res.rows.length > 0){
          return this.inDb = 1;
        }else{
          return this.inDb = 0;
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

  getMovie(){
    this.sub = this.apiProvider.getOneMovie(this.movie.idMovie).subscribe((res)=>{
      this.movieInfo = res;
    });
  }
}
