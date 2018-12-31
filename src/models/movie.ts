import {s} from "@angular/core/src/render3";

export class Movie {
   id: number;
   title: string;
   poster_path: string;
   backdrop_path: string;
   overview: string;

   public constructor(id: number, title: string, poster_path: string, backdrop_path: string,overview: string ){
      this.id = id;
      this.title = title;
      this.poster_path = poster_path;
      this.backdrop_path = backdrop_path;
      this.overview = overview;
   }
}