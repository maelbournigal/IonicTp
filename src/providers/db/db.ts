import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {SQLite, SQLiteObject} from "@ionic-native/sqlite";
import {e} from "@angular/core/src/render3";

/*
  Generated class for the DbProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DbProvider {

  private db: SQLiteObject;

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
        this.db = db;
        var sql =  'create table IF NOT EXISTS `favoris` ()';
        this.db.executeSql(sql)
            .then(()=> console.log('Executed SQL' + sql))
            .catch((e)=>console.log("Error" + JSON.stringify(e)))
    })
      .catch((err)=>{
        console.log(err)
      })
  }

  addFavoris(id,title){
    var sql = "INSERT INTO `favoris`(idMovie,titleMovie) VALUES ('" + id + "','"+ title +"')";
    this.db.executeSql(sql)
        .then(()=> console.log('Executed SQL' + sql))
        .catch((e)=>console.log("Error" + JSON.stringify(e)))
  }

  getFavoris(){
      var sql = "SELECT * FROM favoris";

      this.db.executeSql(sql)
          .then((result) => {
              console.log(JSON.stringify(result));
              if (result.rows.length > 0) {
                  console.log('Result' + result.rows.item(0));
              }
              console.log(result.rows.item(0).username+ result.rows.item(0).password);
              console.log('Rows' + result.rows.length);

          })

          .catch(e => console.log(JSON.stringify(e)));
  }
}

