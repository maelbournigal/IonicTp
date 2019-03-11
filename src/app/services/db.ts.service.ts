import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Movie} from '../models/Movie';
import {SQLite, SQLiteObject} from '@ionic-native/sqlite/ngx';

@Injectable({
  providedIn: 'root'
})
export class Db {

  options = {
    name: 'data.db',
    location: 'default',
  };
  private db: SQLiteObject;

  constructor(private http: HttpClient, private sqlite: SQLite) {
    this.connectToDb();
  }

  private connectToDb() {
    this.sqlite.create(this.options)
        .then((db: SQLiteObject) => {
          console.log('BDD créer');
          this.db = db;
          this.createTable(db);
        })
        .catch((err) => {
          console.log(err);
        });
  }

  createTable(db: SQLiteObject) {
    // var sql = "DROP table `favoris`";
    const sql =  'create table IF NOT EXISTS `favoris` (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL UNIQUE, idMovie TEXT, title TEXT, poster_path TEXT, backdrop_path TEXT, overview TEXT)';
    db.executeSql(sql, [])
        .then(() => console.log('Table favoris crée'))
        .catch((e) => console.log('Error creation table' + JSON.stringify(e)));
  }

  addFavoris(movie: Movie) {
    const sql = `INSERT INTO \`favoris\`(idMovie,title,poster_path,backdrop_path,overview) VALUES ("${movie.id}","${movie.title}", "${movie.poster_path}", "${movie.backdrop_path}", "${movie.overview}")`;
    this.db.executeSql(sql, [])
        .then(() => {
          console.log('Executed SQL' + sql);
        })
        .catch((e) => console.log('Error insert SQL' + JSON.stringify(e)));
  }

  getFavoris(): Promise<any> {
    const sql = 'SELECT * FROM favoris';
    return new Promise((resolve, reject) => {
      this.db.executeSql(sql, [])
          .then((res) => {
            console.log('Executed :' + sql);
            resolve(res);
          })
          .catch((e) => {
            reject(e);
            console.log('echec recupération : ' + JSON.stringify(e));
          });
    });
  }
  getMovie(idMovie): Promise<any> {
    const sql = `SELECT * FROM favoris where idMovie="${idMovie}"`;
    return new Promise((resolve, reject) => {
      this.db.executeSql(sql, [])
          .then((res) => {
            console.log('Executed : ' + sql);
            resolve(res);
          })
          .catch((e) => {
            console.log(JSON.stringify(e));
            reject(e);
          });
    });
  }
  removeFav(movie: Movie) {
    const sql = `Delete from \`favoris\` where idMovie=" + ${movie.idMovie}"`;
    console.log(sql);
    this.db.executeSql(sql)
        .then(
            () => console.log('Executed SQL' + sql)
        )
        .catch(
            (e) => console.log(JSON.stringify(e))
        );
  }
}
