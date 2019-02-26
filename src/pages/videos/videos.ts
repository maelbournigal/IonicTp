import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { YtProvider} from "../../providers/yt/yt";
import { Items} from "../../interfaces/youtube.interfaces";
import { LoadingController, Loading } from "ionic-angular";
import {YoutubeVideoPlayer} from '@ionic-native/youtube-video-player/ngx';

@IonicPage()
@Component({
  selector: 'page-videos',
  templateUrl: 'videos.html',
})
export class VideosPage {

  loader: Loading;
  videos: Items[];

  constructor(public navCtrl: NavController, private youtubeProvider: YtProvider, public loadingCtrl: LoadingController, public youtube: YoutubeVideoPlayer) {}


  ionViewWillEnter() {
    this.searchVideos(1).catch( (err) =>{
      console.log(err);
    } );
  }

  searchVideos(categoryId: number): Promise<any> {
    return this.youtubeProvider.searchVideos(categoryId)
      .then(data => {
        if (data) {
          return this.videos = data.items;
        }
      });
  }

}
