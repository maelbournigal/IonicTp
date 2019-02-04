import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { YoutubeVideoPlayer } from '@ionic-native/youtube-video-player';
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

  this.youtube.openVideo('myvideoid');

  ionViewDidLoad() {
    console.log('ionViewDidLoad TrailerMoviePage');
  }

}
