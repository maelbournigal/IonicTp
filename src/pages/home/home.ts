import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {MovieApiProvider} from "../../providers/movie-api/movie-api";
import {HttpClient} from "@angular/common/http";
import {DetailsPage} from "../details/details";
import {Movie} from "../../models/movie";
import {BarcodeScanner} from "@ionic-native/barcode-scanner";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  listMovies: Array<Movie>;
  page = 1;
  insearch = 0;
  search = '';
  constructor(public navCtrl: NavController, public http: HttpClient, public movieApiProvider: MovieApiProvider, private barcodeScanner: BarcodeScanner) {
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
            let newMovie = new Movie(movie.id, movie.id,movie.title, movie.poster_path, movie.backdrop_path, movie.overview);
            this.listMovies.push(newMovie);
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
  }
  //charge la listes des films par page
  loadLists(){
    this.listMovies = new Array<Movie>();
    this.movieApiProvider.getMovies(this.page).subscribe((data => {
      data.results.forEach((res)=>{
        let movie = new Movie(res.id,res.id, res.title, res.poster_path, res.backdrop_path, res.overview)
        this.listMovies.push(movie);
      })
    }));
  }
  //charges la listes des films correspondants à la recherche
  loadSearch(){
    this.movieApiProvider.searchMovie(this.search, this.page).subscribe((data => {
      this.listMovies = data.results;
    }));
  }

  scanQrCode(){
    let movie: Movie;
    this.barcodeScanner.scan()
      .then(barcodeData => {
        this.movieApiProvider.getOneMovie(parseInt(barcodeData.text)).subscribe((data => {
          movie = new Movie(data.id,data.id,data.title,data.poster_path,data.backdrop_path,data.overview);
          this.navCtrl.push(DetailsPage, {movie: movie})
        }));
      })
      .catch(err=>{
        alert(err)
      })
  }
}

