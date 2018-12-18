import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {MovieApiProvider} from "../../providers/movie-api/movie-api";
import {Observable} from "rxjs/Observable";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  listMovies: Observable<any>;

  constructor(public navCtrl: NavController, public http: HttpClient, public movieApiProvider: MovieApiProvider) {
    this.movieApiProvider.getMovies().subscribe((data => {
      this.listMovies = data.results;
      console.log(this.listMovies);
    }));
  }

  onViewDidLoad(){

  }

  detailsMovie(movie){
    this.navCtrl.push('FilmDetails', {movie: movie})
  }
}

