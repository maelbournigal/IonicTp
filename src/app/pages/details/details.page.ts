import { Component, OnInit } from '@angular/core';
import {Movie} from '../../models/Movie';
import {Subscription} from 'rxjs';
import {MovieApi} from '../../services/movie-api.ts.service';
import {Db} from '../../services/db.ts.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {

  sub: Subscription;
  movie: Movie;
  inDb: number;
  id: string;

  constructor(private route: ActivatedRoute, private dbProvider: Db, private apiProvider: MovieApi) {
    this.id = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.getMovie(this.id);
    this.isFav();
  }

  ionViewWillUnload() {
    this.sub.unsubscribe();
  }

  saveAsFav() {
    this.dbProvider.addFavoris(this.movie);
    this.isFav();
  }

  isFav() {
    this.dbProvider.getMovie(this.id)
      .then((res) => {
        if (res.rows.length > 0) {
          this.inDb = 1;
        } else {
          this.inDb = 0;
        }
      })
      .catch(
          (e) => {
            console.log(JSON.stringify(e));
          }
      );
  }
  removeFav() {
    this.dbProvider.removeFav(this.movie);
    this.isFav();
  }

  getMovie(id) {
    this.sub = this.apiProvider.getOneMovie(id).subscribe((res) => {
      this.movie = res;
    });
  }

}
