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

  constructor(public navCtrl: NavController, public navParams: NavParams, public dbProvider: DbProvider) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FavorisPage');
  }
  ngOnInit(){

  }
  ionViewWillEnter(){
    this.dbProvider.getFavoris();
  }

}
