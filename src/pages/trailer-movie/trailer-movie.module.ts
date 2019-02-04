import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TrailerMoviePage } from './trailer-movie';

@NgModule({
  declarations: [
    TrailerMoviePage,
  ],
  imports: [
    IonicPageModule.forChild(TrailerMoviePage),
  ],
})
export class TrailerMoviePageModule {}
