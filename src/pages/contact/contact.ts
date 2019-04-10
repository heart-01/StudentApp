import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { AddstudenPage } from './../addstuden/addstuden';
import { AddroomPage } from './../addroom/addroom';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {

  constructor(public navCtrl: NavController) {

  }

  addRoom(){
    this.navCtrl.push(AddroomPage);
  }

  addStuden(){
    this.navCtrl.push(AddstudenPage);
  }

}
