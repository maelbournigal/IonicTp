import { Injectable } from '@angular/core';
import {LoadingController} from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  private spinner = {
    // spinner: 'circles'
  };
  private loading;

  constructor(private loadingController: LoadingController) { }

  // Show loading
  show() {
    if (!this.loading) {
      this.loading = this.loadingController.create(this.spinner);
      this.loading.present();
    }
  }

  // Hide loading
  hide() {
    if (this.loading) {
      this.loading.dismiss();
      this.loading = null;
    }
  }
}
