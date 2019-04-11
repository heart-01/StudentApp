import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { SQLite,SQLiteObject } from '@ionic-native/sqlite';
import { Toast } from '@ionic-native/toast';
import { ContactPage } from './../contact/contact';

@IonicPage()
@Component({
  selector: 'page-addstuden',
  templateUrl: 'addstuden.html',
})
export class AddstudenPage {

  IDroom:any;
  data = { IDstuden:"", name:"", tel:"", address:"" };

  constructor(public navCtrl: NavController, public navParams: NavParams, public sqlite : SQLite, public toast : Toast) {
    this.IDroom=navParams.get('IDroom') //รับข้อมูล IDroom ที่ส่งเข้ามา
  }

  saveData(){
    this.sqlite.create({
      name: 'ionicdb.db',
      location: 'default'
    })
      .then(
        (db:SQLiteObject)=>{
          db.executeSql("INSERT INTO student VALUES (?,?,?,?,?,NULL)",
          [
            this.data.IDstuden,
            this.IDroom,
            this.data.name,
            this.data.tel,
            this.data.address
          ]) // ? เป็นการ binding ของ SQLite  จะดึงข้อมูลของ array ใน [] ไล่เรียงมา
          .then(
            res=>{ // res เก็บค่าที่ได้หลังจาก executeSql
              console.log(res); // แสดง res ที่เป็นการคืนค่า หลังจาก executeSql
              this.toast.show('Data Saved','3000','center') //แสดง Data Saved popup toast 3 วินาที
                .subscribe(toast=>{ //subscribe คือ หลังจากแสดงผล toast แล้วให้ทำอะไรต่อ
                  console.log(toast); //แสดงข้อมูล toast
                  this.navCtrl.setRoot(ContactPage);
                  this.navCtrl.popToRoot();
                });
            }
          )
          .catch(e=>{  //หลังเกิด Error แล้วให้แสดง popup แบบ toast
            console.log(e);
            this.toast.show(e.message,'3000','center') //แสดง e คือ แสดง error ว่าเกิดอะไร popup toast 3 วินาที
            .subscribe(toast=>{ //subscribe คือ หลังจากแสดงผล toast แล้วให้ทำอะไรต่อ
              console.log(toast); //แสดงข้อมูล toast
            })
          });
        }
      ).catch(e=>{
        console.log(e);
        this.toast.show(e.message,'3000','center') //แสดง e คือ แสดง error ว่าเกิดอะไร popup toast 3 วินาที
        .subscribe(toast=>{ //subscribe คือ หลังจากแสดงผล toast แล้วให้ทำอะไรต่อ
          console.log(toast); //แสดงข้อมูล toast
        })
      });
  }

}
