import { YoutubeVideoPlayer } from '@ionic-native/youtube-video-player/ngx';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { MovieApiProvider } from '../providers/movie-api/movie-api';
import { HttpClientModule} from "@angular/common/http";
import {TabsPage} from "../pages/tabs/tabs";
import {DetailsPage} from "../pages/details/details";
import {FavorisPage} from "../pages/favoris/favoris";
import { DbProvider } from '../providers/db/db';
import {SQLite} from "@ionic-native/sqlite";
import {QRCodeModule} from "angularx-qrcode";
import {QrCodePage} from "../pages/qr-code/qr-code";
import {BarcodeScanner} from "@ionic-native/barcode-scanner";
import { YtProvider } from '../providers/yt/yt';
import { LoadingProvider } from '../providers/loading/loading';
import {TrailerMoviePage} from "../pages/trailer-movie/trailer-movie";
import {TrailersPage} from "../pages/trailers/trailers";

// @ts-ignore
@NgModule({
  declarations: [
    MyApp,
    HomePage,
    TabsPage,
    DetailsPage,
    FavorisPage,
    TrailersPage,
    TrailerMoviePage,
    QrCodePage,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    QRCodeModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    TabsPage,
    DetailsPage,
    FavorisPage,
    TrailersPage,
    TrailerMoviePage,
    QrCodePage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    MovieApiProvider,
    DbProvider,
    SQLite,
    QRCodeModule,
    BarcodeScanner,
    YtProvider,
    YoutubeVideoPlayer,
    LoadingProvider,
  ]
})
export class AppModule {}
