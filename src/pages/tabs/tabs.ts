import { VideosPage } from './../videos/videos';
import { Component } from '@angular/core';
import {HomePage} from "../home/home";
import {FavorisPage} from "../favoris/favoris";

/**
 * Generated class for the TabsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  templateUrl: 'tabs.html',
})
export class TabsPage {
  tab1root = HomePage;
  tab2root = FavorisPage;
  tab3root = VideosPage;

  constructor() {
  }
}
