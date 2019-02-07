import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { YtProvider} from "../../providers/yt/yt";
import { Items} from "../../interfaces/youtube.interfaces";
import { LoadingController, Loading } from "ionic-angular";
import {YoutubeVideoPlayer} from '@ionic-native/youtube-video-player/ngx';

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

  loader: Loading;
  videos: Items[];

  constructor(public navCtrl: NavController, private youtubeProvider: YtProvider, public loadingCtrl: LoadingController, public youtube: YoutubeVideoPlayer) {

  }
  searchVideos(categoryId: number) {
    this.youtubeProvider.searchVideos(categoryId)
      .then(data => {
        if (data) {
          this.videos = data.items;
        }
      });
  }

  private presentLoading() {
    this.loader = this.loadingCtrl.create({
      content: "Please wait..."
    });
    this.loader.present();
  }

}
