import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DetailstudentPage } from '../detailstudent/detailstudent';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
  IDstudent:any;
  constructor(public navCtrl: NavController) {

  }

  searchData(){
    var IDstudent = this.IDstudent
    this.navCtrl.push(DetailstudentPage,{IDstudent : IDstudent});
  }

}
