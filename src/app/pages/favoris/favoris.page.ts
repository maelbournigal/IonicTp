import { Component, OnInit } from '@angular/core';
import {Movie} from '../../models/Movie';
import {Db} from '../../services/db.ts.service';
import {BarcodeScanner} from '@ionic-native/barcode-scanner/ngx';
import {MovieApi} from '../../services/movie-api.ts.service';

@Component({
  selector: 'app-favoris',
  templateUrl: './favoris.page.html',
  styleUrls: ['./favoris.page.scss'],
})
export class FavorisPage implements OnInit {

  favories = Array<Movie>();

  constructor(private dbProvider: Db, private barcodeScanner: BarcodeScanner, private movieApiProvider: MovieApi) {
    this.loadFav().catch((err) => {
        console.log('Erreur de chargement des favoris');
    });
  }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.loadFav().catch( (err) => {
        console.log('Erreur de chargement des favoris');
    });
  }

  loadFav(): Promise<any> {
    let movie: Movie;
    return this.dbProvider.getFavoris()
        .then((res) => {
          this.favories.splice(0, this.favories.length);
          for (let i = 0; i < res.rows.length; i++) {
            movie = new Movie(res.rows.item(i).id, res.rows.item(i).idMovie, res.rows.item(i).title,
            res.rows.item(i).poster_path, res.rows.item(i).backdrop_path, res.rows.item(i).overview);
            this.favories.push(movie);
          }
          return this.favories;
        })
        .catch((e) => {
          console.log('echec synchro' + JSON.stringify(e));
        });
  }

  scanQrCode(): Promise<any> {
    let movie: Movie;
    return this.barcodeScanner.scan()
        .then(barcodeData => {
          return this.movieApiProvider.getOneMovie(parseInt(barcodeData.text, 0)).subscribe((data => {
            movie = new Movie(data.id, data.id, data.title, data.poster_path, data.backdrop_path, data.overview);
          }));
        })
        .catch(err => {
          alert(err);
        });
  }

}
