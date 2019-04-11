import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { SQLite,SQLiteObject } from '@ionic-native/sqlite';
import { Toast } from '@ionic-native/toast';
import { AddstudenPage } from './../addstuden/addstuden';

@IonicPage()
@Component({
  selector: 'page-selectroom',
  templateUrl: 'selectroom.html',
})
export class SelectroomPage {

  dataRoom:any[];

  constructor(public navCtrl: NavController, public navParams: NavParams, public sqlite: SQLite, public toast: Toast) {
  }

  ionViewDidLoad(){
    this.getData();
  }

  getData(){
    this.sqlite.create({  
      name:'ionicdb.db', 
      location:'default' 
    }).then( 
      (db: SQLiteObject)=>{ 
            
        db.executeSql('SELECT * FROM room ORDER BY IDroom DESC',[])
          .then(res=>{ // res เป็นผลที่ได้หลังจากการ query
            this.dataRoom=[];
            for(var i=0;i<res.rows.length;i++){  //res.rows คือจำนวนแถวที่ได้จากการ executeSql เริ่มต้นที่ 1
              this.dataRoom.push({ //push เป็นการนำข้อมูลใส่ในตัวแปร dataRoom
                IDroom: res.rows.item(i).IDroom, //สร้าง ตัวแปร IDroom แล้วเก็บค่าของแถว IDroom
                nameRoom: res.rows.item(i).nameRoom
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
    );
  }

  addData(IDroom){
    this.navCtrl.push(AddstudenPage,{IDroom : IDroom});
  }

}
