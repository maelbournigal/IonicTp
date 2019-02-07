import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { YoutubeVideoPlayer } from '@ionic-native/youtube-video-player/ngx';

/**
 * Generated class for the TrailerMoviePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-trailer-movie',
  templateUrl: 'trailer-movie.html',
})
export class TrailerMoviePage {

    constructor(private youtube: YoutubeVideoPlayer) { }



  ionViewDidLoad() {
    this.youtube.openVideo('WDkg3h8PCVU');
    console.log('ionViewDidLoad TrailerMoviePage');
  }

}
