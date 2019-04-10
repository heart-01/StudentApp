import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-addstuden',
  templateUrl: 'addstuden.html',
})
export class AddstudenPage {

  data = { idStuden:"", name:"", tel:"", address:"", classStudy:"" };

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }


}
