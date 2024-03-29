import { Injectable } from '@angular/core';
import {Observable} from "rxjs/Observable";
import {HttpClient, HttpHeaders} from "@angular/common/http";

/*
  Generated class for the MovieApiProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MovieApiProvider {
  private url = 'https://api.themoviedb.org/3/discover/movie?';
  // private parameters = {};
  listMovies: Observable<any>;
  page = 1;

  private httpOptions = {
    headers: new HttpHeaders({
      "content-type": "application/json"
    }),
    params: {
      "api_key":"ddaf1b35377204ecd470260a0512cfec",
      "language":"fr",
      "page": this.page.toString(),
      "query": ''
    }
  };

  constructor(public http: HttpClient) {
    console.log("Hello MovieApiProvider Provider");
  }

  getMovies(idpage): Observable<any> {
    this.url = "https://api.themoviedb.org/3/discover/movie?";
    this.httpOptions.params.page = idpage;
    this.httpOptions.params.query = '';
    this.listMovies = this.http.get(this.url, this.httpOptions);
    return this.listMovies;
  }
  getOneMovie(id):Observable<any>{
    this.url = "https://api.themoviedb.org/3/movie/"+id+"?api_key=ddaf1b35377204ecd470260a0512cfec&language=fr";
    return this.http.get(this.url);
  }
  searchMovie(search, idpage): Observable<any>{
    if (search){
      this.url = "https://api.themoviedb.org/3/search/movie?";
      this.httpOptions.params.page = idpage;
      this.httpOptions.params.query = search;
    } else {
      this.url = "https://api.themoviedb.org/3/discover/movie?";
      this.httpOptions.params.page = idpage;
      this.httpOptions.params.query = '';
    }
    this.listMovies = this.http.get(this.url, this.httpOptions);
    return this.listMovies;
  }
}
