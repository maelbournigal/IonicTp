import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {SQLite, SQLiteObject} from "@ionic-native/sqlite";

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
        var sql =  'create table IF NOT EXISTS `favoris` (idMovie,titleMovie)';
        db.executeSql(sql, [])
            .then(()=> console.log('Executed SQL' + sql))
            .catch((e)=>console.log("Error open database" + JSON.stringify(e)))
    })
      .catch((err)=>{
        console.log(err)
      })
  }

  addFavoris(id,title: string){
    var sql = "INSERT INTO `favoris`(idMovie,titleMovie) VALUES ('" + id +"','"+ title +"')";
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
                  var favories = [];
                  console.log("Result :" + JSON.stringify(res));
                  for (var i=0; i< res.rows.length; i++){
                    console.log("result : " + res.rows.item(i).titleMovie);
                    favories.push({id: res.rows.item(i).id, title: res.rows.item(i).titleMovie})
                  };
                  console.log('Executed :' + sql);
              })
              .catch(e => console.log(JSON.stringify(e)))
          }).catch((err)=>{
            console.log(err);
          });
  }
}

