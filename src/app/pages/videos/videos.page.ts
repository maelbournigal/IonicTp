import { Component, OnInit } from '@angular/core';
import {Items} from '../../interfaces/youtube.interfaces';
import {YtService} from '../../services/yt.service';
import {YoutubeVideoPlayer} from '@ionic-native/youtube-video-player/ngx';
import {LoadingController} from '@ionic/angular';
import {LoadingService} from '../../services/loading.service';

@Component({
  selector: 'app-videos',
  templateUrl: './videos.page.html',
  styleUrls: ['./videos.page.scss'],
})
export class VideosPage implements OnInit {

  loader: LoadingService;
  videos: Items[];

  constructor( private youtubeProvider: YtService, public loadingCtrl: LoadingController, public youtube: YoutubeVideoPlayer) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.searchVideos(1).catch( (err) => {
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
