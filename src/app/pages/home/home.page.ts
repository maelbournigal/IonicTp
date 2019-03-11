import { Component } from '@angular/core';
import { Movie } from '../../models/Movie';
import { Subscription } from 'rxjs';
import { HTTP } from '@ionic-native/http/ngx';
import { MovieApi } from '../../services/movie-api.ts.service';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  sub: Subscription;
  listMovies: Array<Movie>;
  page = 1;
  insearch = 0;
  search = '';

  constructor(private http: HTTP, private movieApiProvider: MovieApi, private barcodeScanner: BarcodeScanner) {
    this.loadLists();
  }

  ionViewWillUnload() {
    this.sub.unsubscribe();
  }

  doInfinite(event) {
    this.page++;
    setTimeout(() => {
      if (this.insearch === 0) {
        this.sub = this.movieApiProvider.getMovies(this.page).subscribe((data => {
          const newlist = data.results;
          newlist.forEach((movie) => {
            const newMovie = new Movie(movie.id, movie.id, movie.title, movie.poster_path, movie.backdrop_path, movie.overview);
            this.listMovies.push(newMovie);
          });
          event.target.complete();
        }));
      } else {
        this.sub = this.movieApiProvider.searchMovie(this.search, this.page).subscribe((data => {
          const newlist = data.results;
          newlist.forEach((movie) => {
            this.listMovies.push(movie);
          });
          event.target.complete();
        }));
      }
    }, 500);
  }

  onInput(event) {
    this.page = 1;
    this.search = event.target.value;
    if (this.search !== '') {
      this.insearch = 1;
      this.loadSearch();
    } else {
      this.loadLists();
    }
  }
  onCancel(event) {
    this.page = 1;
    this.insearch = 0;
  }
  // Charge la listes des films par page
  loadLists() {
    this.listMovies = new Array<Movie>();
    this.sub = this.movieApiProvider.getMovies(this.page).subscribe((data => {
      data.results.forEach((res) => {
        const movie = new Movie(res.id, res.id, res.title, res.poster_path, res.backdrop_path, res.overview)
        this.listMovies.push(movie);
      });
    }));
  }
  // Charges la listes des films correspondants à la recherche
  loadSearch() {
    this.listMovies = new Array<Movie>();
    this.sub = this.movieApiProvider.searchMovie(this.search, this.page).subscribe((data => {
      data.results.forEach((res) => {
        const movie = new Movie(res.id, res.id, res.title, res.poster_path, res.backdrop_path, res.overview)
        this.listMovies.push(movie);
      });
    }));
  }

  scanQrCode() {
    let movie: Movie;
    this.barcodeScanner.scan()
        .then(barcodeData => {
          this.sub = this.movieApiProvider.getOneMovie(parseInt(barcodeData.text, 0)).subscribe((data => {
            movie = new Movie(data.id, data.id, data.title, data.poster_path, data.backdrop_path, data.overview);

          }));
        })
        .catch(err => {
          alert(err);
        });
  }
}
