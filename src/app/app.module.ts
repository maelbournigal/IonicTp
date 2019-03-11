import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {MovieApi} from './services/movie-api.ts.service';
import {HttpClientModule} from '@angular/common/http';
import {QRCodeModule} from 'angularx-qrcode';
import {TabsPage} from './pages/tabs/tabs.page';

@NgModule({
  declarations: [AppComponent, TabsPage],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule, QRCodeModule],
  providers: [
    StatusBar,
    SplashScreen,
    MovieApi,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
