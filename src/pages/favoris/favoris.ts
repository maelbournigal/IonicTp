import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {DbProvider} from "../../providers/db/db";

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

  favories = [];

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
            this.favories.push({id: res.rows.item(i).id, title: res.rows.item(i).titleMovie})
        };
    });
  }

}
