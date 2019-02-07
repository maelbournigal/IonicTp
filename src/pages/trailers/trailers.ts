import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { YoutubeVideoPlayer } from '@ionic-native/youtube-video-player/ngx';

/**
 * Generated class for the PlaylistBaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-trailers',
  templateUrl: 'trailers.html',
})
export class TrailersPage {

  constructor(private youtube: YoutubeVideoPlayer) { }



  ionViewDidLoad() {
    this.youtube.openVideo('myvideoid');
    console.log('ionViewDidLoad TrailerMoviePage');
  }

}
