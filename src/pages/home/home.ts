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
  listMovies = [];
  page = 1;
  constructor(public navCtrl: NavController, public http: HttpClient, public movieApiProvider: MovieApiProvider) {
    this.movieApiProvider.getMovies(this.page).subscribe((data => {
      this.listMovies = data.results;
      console.log(this.listMovies);
    }));
  }

  onViewDidLoad(){

  }

  detailsMovie(movie){
    this.navCtrl.push(DetailsPage, {movie: movie})
  }

  doInfinite(infiniteScroll) {
    console.log('Begin async operation');
    this.page++;
    setTimeout(() => {
      this.movieApiProvider.getMovies(this.page).subscribe((data => {
        let newlist = data.results;
        newlist.forEach((movie)=>{
          this.listMovies.push(movie);
        });
      }));

      console.log('Async operation has ended');
      infiniteScroll.complete();
    }, 500);
  }
}

