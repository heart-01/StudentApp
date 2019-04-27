import { StudentPage } from './../student/student';
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
  IDpage=0;
  data = { IDstuden:"", name:"", tel:"", address:"" };

  constructor(public navCtrl: NavController, public navParams: NavParams, public sqlite : SQLite, public toast : Toast) {
    this.IDroom=navParams.get('IDroom'); //รับข้อมูล IDroom ที่ส่งเข้ามา
    this.IDpage=navParams.get('IDpage');
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

                  var IDpage = this.IDpage;
                  if(IDpage==1){
                    var IDroom=this.IDroom;
                    this.navCtrl.setRoot(StudentPage,{ IDroom : IDroom }); //setRoot คือการออกจากเพจทั้งหมดแล้วเปิดเพจนั้นขึ้นมาและส่งพารามิเตอร์เข้าไปหน้า StudentPage
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
