import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { SQLite,SQLiteObject } from '@ionic-native/sqlite';
import { Toast } from '@ionic-native/toast';

@IonicPage()
@Component({
  selector: 'page-detailstudent',
  templateUrl: 'detailstudent.html',
})
export class DetailstudentPage {

  IDstudent:any;
  detailstudent:any[];

  constructor(public navCtrl: NavController, public navParams: NavParams, public sqlite: SQLite, public toast: Toast) {

    this.IDstudent=navParams.get('IDstudent') //รับข้อมูล IDstudent ที่ส่งเข้ามา

  }

  getData(){
    this.sqlite.create(
      {
        name: 'ionicdb.db',
        location:'default'
      }
    )
    .then(
      (db: SQLiteObject)=>{
        var IDstudent = this.IDstudent;
        db.executeSql('SELECT * FROM student WHERE IDstudent=?',[IDstudent])
        .then(res=>{ // res เป็นผลที่ได้หลังจากการ query
          this.detailstudent=[];
          for(var i=0;i<res.rows.length;i++){  //res.rows คือจำนวนแถวที่ได้จากการ executeSql เริ่มต้นที่ 1
            this.detailstudent.push({ //push เป็นการนำข้อมูลใส่ในตัวแปร dataStudent
              IDstudent: res.rows.item(i).IDstudent, //สร้าง ตัวแปร IDstudent แล้วเก็บค่าของแถว IDstudent
              name: res.rows.item(i).name,
              tel: res.rows.item(i).tel,
              address: res.rows.item(i).address,
            });
          }
        })
        .catch(e=>{  //SQL เกิด Error ให้ตกมาอยู่ที่ catch แล้วให้แสดง popup แบบ toast
          console.log(e);
          this.toast.show(e.message,'3000','center') 
          .subscribe(toast=>{ //subscribe คือ หลังจากแสดงผล toast แล้วให้ทำอะไรต่อ
            console.log(toast);
          })
        });

      }
    )
    .catch(e=>{  //SQL เกิด Error ให้ตกมาอยู่ที่ catch แล้วให้แสดง popup แบบ toast
      console.log(e);
      this.toast.show(e.message,'3000','center') 
      .subscribe(toast=>{ //subscribe คือ หลังจากแสดงผล toast แล้วให้ทำอะไรต่อ
        console.log(toast);
      })
    });
  }



}
