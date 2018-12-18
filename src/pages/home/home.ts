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
  copyListMovies = [];
  page = 1;
  insearch = 0;
  search = '';
  constructor(public navCtrl: NavController, public http: HttpClient, public movieApiProvider: MovieApiProvider) {
    this.loadLists();
  }

  onViewDidLoad(){
  }

  detailsMovie(movie){
    this.navCtrl.push(DetailsPage, {movie: movie})
  }

  doInfinite(infiniteScroll) {
    this.page++;
    setTimeout(() => {
      if (this.insearch == 0){
        this.movieApiProvider.getMovies(this.page).subscribe((data => {
          let newlist = data.results;
          newlist.forEach((movie)=>{
            this.listMovies.push(movie);
          });
        }));
      }else{
        this.movieApiProvider.searchMovie(this.search, this.page).subscribe((data => {
          let newlist = data.results;
          newlist.forEach((movie)=>{
            this.listMovies.push(movie);
          });
        }));
      }
      infiniteScroll.complete();
    }, 500);
  }

  onInput(event){
    this.page=1;
    this.search = event.target.value;
    if (this.search != ''){
      this.insearch = 1;
      this.loadSearch();
    }else{
      this.loadLists();
    }
  }
  onCancel(event){
    this.page = 1;
    this.insearch = 0;
    this.loadLists();
  }
  //charge la listes des films par page
  loadLists(){
    this.movieApiProvider.getMovies(this.page).subscribe((data => {
      this.listMovies = data.results;
    }));
  }
  //charges la listes des films correspondants à la recherche
  loadSearch(){
    this.movieApiProvider.searchMovie(this.search, this.page).subscribe((data => {
      this.listMovies = data.results;
    }));
  }
}

