import { Injectable } from '@angular/core';
import { HttpClient} from "@angular/common/http"

import {YouTubeAPIRequest} from "../../interfaces/youtube.interfaces";

const apiKey = 'AIzaSyA0qfhWkdpn3eoa4Ga1WCCL6_yAQGYMsCs';
const apiUrl = 'https://www.googleapis.com/youtube/v3/';

@Injectable()
export class YtProvider {

  constructor(public http: HttpClient) { }

  public searchVideos(categoryId: number = 1): Promise<YouTubeAPIRequest> {
    return this.http.get(`${apiUrl}search?part=snippet&videoCategoryId=${categoryId}&key=${apiKey}&maxResults=30&type=video`)
      .toPromise()
      .then((response: YouTubeAPIRequest) => {
        return response;
      });
  }

}
