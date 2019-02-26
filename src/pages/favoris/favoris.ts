import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {DbProvider} from "../../providers/db/db";
import {Movie} from "../../models/movie";
import {DetailsPage} from "../details/details";
import {BarcodeScanner} from "@ionic-native/barcode-scanner";
import {MovieApiProvider} from "../../providers/movie-api/movie-api";

/**
 * Generated class for the FavorisPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-favoris',
  templateUrl: 'favoris.html',
})
export class FavorisPage {

  favories = Array<Movie>();

  constructor(public navCtrl: NavController, public navParams: NavParams, public dbProvider: DbProvider, private barcodeScanner: BarcodeScanner, private movieApiProvider: MovieApiProvider) {
    this.loadFav().catch(err => {
      console.log(err);
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FavorisPage');
  }

  ionViewWillEnter(){
    this.loadFav().catch((err) => {
      console.log(err)
    });
  }

  loadFav(): Promise<any> {
    let movie: Movie;
    return this.dbProvider.getFavoris()
      .then((res)=>{
        this.favories.splice(0,this.favories.length);
        for (var i=0; i< res.rows.length; i++){
          movie = new Movie(res.rows.item(i).id,res.rows.item(i).idMovie,res.rows.item(i).title,res.rows.item(i).poster_path,res.rows.item(i).backdrop_path,res.rows.item(i).overview);
          this.favories.push(movie);
        };
      })
      .catch((e)=>{
        console.log('echec synchro' + JSON.stringify(e))
      });
  }

  detailsMovie(movie: Movie){
    this.navCtrl.push(DetailsPage, {movie: movie}).catch( (err) => {
      console.log(err);
    } );
  }

  scanQrCode(): Promise<any>{
    let movie: Movie;
    return this.barcodeScanner.scan()
      .then(barcodeData => {
        this.movieApiProvider.getOneMovie(parseInt(barcodeData.text)).subscribe((data => {
          movie = new Movie(data.id,data.id,data.title,data.poster_path,data.backdrop_path,data.overview);
          this.navCtrl.push(DetailsPage, {movie: movie})
        }));
      })
      .catch(err=>{
        console.log(err)
      })
  }
}
