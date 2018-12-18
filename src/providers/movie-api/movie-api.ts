import { Injectable } from '@angular/core';
import {Observable} from "rxjs/Observable";
import {HttpClient} from "@angular/common/http";

/*
  Generated class for the MovieApiProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MovieApiProvider {
  private url = 'https://api.themoviedb.org/3/discover/movie?api_key=ddaf1b35377204ecd470260a0512cfec&language=fr&page=';
  // private parameters = {};
  listMovies: Observable<any>;

  constructor(public http: HttpClient) {
    console.log("Hello MovieApiProvider Provider");
  }

  getMovies(idpage): Observable<any> {
    this.listMovies = this.http.get(this.url + idpage);
    return this.listMovies;
  }
}

