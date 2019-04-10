import { DetailstudentPage } from './../detailstudent/detailstudent';
import { AddstudenPage } from './../addstuden/addstuden';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { SQLite,SQLiteObject } from '@ionic-native/sqlite';
import { Toast } from '@ionic-native/toast';
import { EditstudentPage } from '../editstudent/editstudent';

@IonicPage()
@Component({
  selector: 'page-student',
  templateUrl: 'student.html',
})
export class StudentPage {

  IDroom:any;
  dataStudent:any[];

  constructor(public navCtrl: NavController, public navParams: NavParams, public sqlite: SQLite, public toast: Toast) {
    this.IDroom=navParams.get('IDroom') //รับข้อมูล IDroom ที่ส่งเข้ามา
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
        var IDroom = this.IDroom;
        db.executeSql('SELECT * FROM student WHERE IDroom=? ORDER BY IDstudent DESC',[IDroom])
        .then(res=>{ // res เป็นผลที่ได้หลังจากการ query
          this.dataStudent=[];
          for(var i=0;i<res.rows.length;i++){  //res.rows คือจำนวนแถวที่ได้จากการ executeSql เริ่มต้นที่ 1
            this.dataStudent.push({ //push เป็นการนำข้อมูลใส่ในตัวแปร dataStudent
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

  addData(){
    this.navCtrl.push(AddstudenPage);
  }

  editData(IDstudent){
    this.navCtrl.push(EditstudentPage,{ IDstudent : IDstudent });
  }

  deleteData(IDstudent){
    this.sqlite.create(
      {
        name: 'ionicdb.db',
        location:'default'
      }
    )
    .then(
      (db: SQLiteObject)=>{
        db.executeSql('DELETE FROM student WHERE IDstudent=?',[IDstudent])
        .then(res=>{
          console.log(res); 
          this.getData(); //กลับไปใช้ getData เพื่อ แสดงหน้ารายการใหม่อีกครั้ง
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

  viewDetail(IDstudent){
    this.navCtrl.push(DetailstudentPage,{IDstudent : IDstudent});
  }

}
