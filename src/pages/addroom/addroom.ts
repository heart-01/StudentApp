import { HomePage } from './../home/home';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { SQLite,SQLiteObject } from '@ionic-native/sqlite';
import { Toast } from '@ionic-native/toast';
import { ContactPage } from './../contact/contact';

@IonicPage()
@Component({
  selector: 'page-addroom',
  templateUrl: 'addroom.html',
})
export class AddroomPage {

  nameRoom:any;
  IDpage=0;

  constructor(public navCtrl: NavController, public navParams: NavParams, public sqlite : SQLite, public toast : Toast) {
    this.IDpage=navParams.get('IDpage')
  }

  saveData(){
    this.sqlite.create({
      name: 'ionicdb.db',
      location: 'default'
    })
      .then(
        (db:SQLiteObject)=>{
          db.executeSql("INSERT INTO room VALUES (NULL,?)",[this.nameRoom]) // ? เป็นการ binding ของ SQLite  จะดึงข้อมูลของ array ใน [] ไล่เรียงมา
          .then(
            res=>{ // res เก็บค่าที่ได้หลังจาก executeSql
              console.log(res); // แสดง res ที่เป็นการคืนค่า หลังจาก executeSql
              this.toast.show('Data Saved','3000','center') //แสดง Data Saved popup toast 3 วินาที
                .subscribe(toast=>{ //subscribe คือ หลังจากแสดงผล toast แล้วให้ทำอะไรต่อ
                  console.log(toast); //แสดงข้อมูล toast
                  var IDpage = this.IDpage;
                  if(IDpage==1){
                    this.navCtrl.popTo(HomePage);
                  }else if(IDpage==0){
                    this.navCtrl.popTo(ContactPage); // popTo คือการ pop หน้าเพจออกจนกว่าจะมาเจอหน้าที่อยู่ในวงเล็บ ถ้าไม่เจอหน้าที่อยู่ในวงเล็บจะกลับไปหน้า setRoot
                  }
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
