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

  constructor(public http: HttpClient, private sqlite: SQLite) {
    console.log('Hello DbProvider Provider');
  }
  createDatabase(){
    this.sqlite.create({
      name: 'data.db',
      location: 'default',
    })
      .then((db: SQLiteObject)=>{
        db.executeSql('create table favoris(name varchar(32))', [])
          .then(()=>{
            console.log('Executed SQL')
          })
          .catch((err)=>{
            console.log(err)
          })
    })
      .catch((err)=>{
        console.log(err)
      })
  }
}

