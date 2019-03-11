import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {TabsPage} from './pages/tabs/tabs.page';

const routes: Routes = [
  { path: '', redirectTo: 'tabs', pathMatch: 'full' },
  { path: 'details/:id', loadChildren: './pages/details/details.module#DetailsPageModule' },
  { path: 'qr-code/:id', loadChildren: './pages/qr-code/qr-code.module#QrCodePageModule' },
  { path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'home',
        children: [
          { path: '', loadChildren: './pages/home/home.module#HomePageModule'},
        ],
      },
      {
        path: 'favoris',
        children: [
          { path: '', loadChildren: './pages/favoris/favoris.module#FavorisPageModule' },
        ]
      },
      {
        path: 'youtube',
        children: [
          { path: '', loadChildren: './pages/videos/videos.module#VideosPageModule' }
        ]
      },
      { path: '', redirectTo: '/tabs/home', pathMatch: 'full' },
    ], },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
