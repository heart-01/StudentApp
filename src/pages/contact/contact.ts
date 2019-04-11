import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { SelectroomPage } from './../selectroom/selectroom';
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
    this.navCtrl.push(SelectroomPage);
  }

}
