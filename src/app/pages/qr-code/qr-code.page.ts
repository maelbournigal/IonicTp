import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-qr-code',
  templateUrl: './qr-code.page.html',
  styleUrls: ['./qr-code.page.scss'],
})
export class QrCode implements OnInit {

  id: string;

  constructor(private route: ActivatedRoute) {
    this.id = route.snapshot.paramMap.get('id');
  }

  ngOnInit() {
    console.log('ionViewDidLoad QrCodePage');
  }

}
