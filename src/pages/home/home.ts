import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {MovieApiProvider} from "../../providers/movie-api/movie-api";
import {Observable} from "rxjs/Observable";
import {HttpClient} from "@angular/common/http";
import {DetailsPage} from "../details/details";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  listMovies: Observable<any>;

  constructor(public navCtrl: NavController, public http: HttpClient, public movieApiProvider: MovieApiProvider) {
    this.movieApiProvider.getMovies(1).subscribe((data => {
      this.listMovies = data.results;
      console.log(this.listMovies);
    }));
  }

  onViewDidLoad(){

  }

  detailsMovie(movie){
    this.navCtrl.push(DetailsPage, {movie: movie})
  }
}

