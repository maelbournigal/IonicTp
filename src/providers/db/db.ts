import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {SQLite, SQLiteObject} from "@ionic-native/sqlite";
import {Movie} from "../../models/movie";

/*
  Generated class for the DbProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DbProvider {

  options= {
      name: 'data.db',
      location: 'default',
      createFromLocation: 1
  }

  constructor(public http: HttpClient, private sqlite: SQLite) {
    this.connectToDb();
  }

  private connectToDb(){
    this.sqlite.create(this.options)
      .then((db: SQLiteObject)=>{
        var sql =  'create table IF NOT EXISTS `favoris` (id,title,poster_path,backdrop_path,overview)';
        db.executeSql(sql, [])
            .then(()=> console.log('Executed SQL' + sql))
            .catch((e)=>console.log("Error open database" + JSON.stringify(e)))
    })
      .catch((err)=>{
        console.log(err)
      })
  }

  addFavoris(movie: Movie){
    var sql = "INSERT INTO `favoris`(id,title,poster_path,backdrop_path,overview) VALUES ('" + movie.id +"','"+ movie.title +"', '" + movie.poster_path +"', '" + movie.backdrop_path +"', '" + movie.overview +"')";
    this.sqlite.create(this.options)
        .then((db: SQLiteObject)=>
          {
            db.executeSql(sql, [])
              .then(()=>console.log('Executed SQL' + sql))
              .catch((e)=>console.log('Error insert SQL' + JSON.stringify(e)))
          }
        )
        .catch((err)=>console.log("Error" + err))
  }

  getFavoris():Promise<any>{
      var sql = "SELECT * FROM favoris";

      return this.sqlite.create((this.options))
          .then((db: SQLiteObject) => {
            db.executeSql(sql, [])
              .then((res)=>{
                  var favories = Array<Movie>();
                  console.log("Result :" + JSON.stringify(res));
                  for (var i=0; i< res.rows.length; i++){
                    console.log("result : " + res.rows.item(i).titleMovie);
                    favories.push({id: res.rows.item(i).id, title: res.rows.item(i).titleMovie, poster_path: res.rows.item(i).poster_path, backdrop_path: res.rows.item(i).backdrop_path, overview: res.rows.item(i).overview})
                  };
                  console.log('Executed :' + sql);
              })
              .catch(e => console.log(JSON.stringify(e)))
          }).catch((err)=>{
            console.log(err);
          });
  }
}

