import { Injectable } from '@angular/core';
import { HttpClient} from "@angular/common/http"
import 'rxjs/add/operator/map';

@Injectable()
export class YtProvider {
  apiKey = 'AIzaSyA0qfhWkdpn3eoa4Ga1WCCL6_yAQGYMsCs';//place your youtube api key here

  constructor(public http: HttpClient) { }

  //this function gets the categories from the youTube rest api.
  getCategories(){
    return this.http.get('https://www.googleapis.com/youtube/v3/videoCategories?order=viewCount&part=snippet&regionCode=US&key='+this.apiKey)
      .map((res) => {
        return res;
      })
  }
  //this function gets videos from the specified category from the youtube rest api
  getVideos(category){
    return this.http.get('https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&videoCategoryId='+category+'&key='+this.apiKey)
      .map((res) => {
        return res;
      })
  }
}