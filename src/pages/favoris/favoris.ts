import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {DbProvider} from "../../providers/db/db";
import {Movie} from "../../models/movie";

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

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FavorisPage');
  }
  ngOnInit(){

  }
  ionViewWillEnter(){
    this.dbProvider.getFavoris().then((res)=>{
        for (var i=0; i< res.rows.length; i++){
            console.log("result : " + res.rows.item(i).titleMovie);
            this.favories.push(new Movie(res.rows.item(i).id, res.rows.item(i).title,res.rows.item(i).poster_path,res.rows.item(i).backdrop_path,res.rows.item(i).overview));
        };
    });
  }

}
