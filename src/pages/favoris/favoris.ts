import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {DbProvider} from "../../providers/db/db";
import {Movie} from "../../models/movie";
import {DetailsPage} from "../details/details";

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

  constructor(public navCtrl: NavController, public navParams: NavParams, public dbProvider: DbProvider) {
    this.loadFav();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FavorisPage');
  }

  ionViewWillEnter(){
    this.loadFav();
  }

  loadFav(){
    let movie: Movie;
    this.dbProvider.getFavoris()
      .then((res)=>{
        this.favories.splice(0,this.favories.length);
        for (var i=0; i< res.rows.length; i++){
          movie = new Movie(res.rows.item(i).id,res.rows.item(i).idMovie,res.rows.item(i).title,res.rows.item(i).poster_path,res.rows.item(i).backdrop_path,res.rows.item(i).overview);
          this.favories.push(movie);
        };
        console.log(this.favories);
      })
      .catch((e)=>{
        console.log('echec synchro' + JSON.stringify(e))
      });
  }

  detailsMovie(movie: Movie){
    this.navCtrl.push(DetailsPage, movie);
  }

}
