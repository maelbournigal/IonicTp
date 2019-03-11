import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { QrCode } from './qr-code.page';
import {QRCodeModule} from 'angularx-qrcode';

const routes: Routes = [
  {
    path: '',
    component: QrCode
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    QRCodeModule,
    RouterModule.forChild(routes)
  ],
  declarations: [QrCode]
})
export class QrCodePageModule {}
