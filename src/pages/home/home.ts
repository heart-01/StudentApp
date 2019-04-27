import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { SQLite,SQLiteObject } from '@ionic-native/sqlite';
import { Toast } from '@ionic-native/toast';
import { EditroomPage } from './../editroom/editroom';
import { AddroomPage } from './../addroom/addroom';
import { StudentPage } from './../student/student';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  dataRoom:any[];

  constructor(public navCtrl: NavController, public sqlite: SQLite, public toast: Toast) {

  }

  ionViewDidLoad(){
    this.getData();
  }

  ionViewWillEnter(){
    this.getData();
  }

  getData(){
    this.sqlite.create({  
      name:'ionicdb.db', 
      location:'default' 
    }).then( 
      (db: SQLiteObject)=>{ 
        db.executeSql('CREATE TABLE IF NOT EXISTS room (IDroom INTEGER PRIMARY KEY, nameRoom TEXT)',[]) 
          .then(res=>{console.log('Executed SQL')})
          .catch(e=>{  //SQL เกิด Error ให้ตกมาอยู่ที่ catch แล้วให้แสดง popup แบบ toast
            console.log(e);
            this.toast.show(e.message,'3000','center') 
            .subscribe(toast=>{ //subscribe คือ หลังจากแสดงผล toast แล้วให้ทำอะไรต่อ
              console.log(toast);
            })
          });
     
        db.executeSql('CREATE TABLE IF NOT EXISTS student (IDstudent INTEGER PRIMARY KEY, IDroom INTEGER, name TEXT, tel TEXT, address TEXT, image BLOB)',[]) 
          .then(res=>{console.log('Executed SQL')})
          .catch(e=>{  //SQL เกิด Error ให้ตกมาอยู่ที่ catch แล้วให้แสดง popup แบบ toast
            console.log(e);
            this.toast.show(e.message,'3000','center') 
            .subscribe(toast=>{ //subscribe คือ หลังจากแสดงผล toast แล้วให้ทำอะไรต่อ
              console.log(toast);
            })
          });
            
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
  
  viewRoom(IDroom){
    this.navCtrl.push(StudentPage,{IDroom : IDroom});
  }

  addData(){
    this.navCtrl.push(AddroomPage,{ IDpage : 1 });
  }

  editData(IDroom){
    this.navCtrl.push(EditroomPage,{ IDroom : IDroom });
  }

  deleteData(IDroom){
    this.sqlite.create(
      {
        name: 'ionicdb.db',
        location:'default'
      }
    )
    .then(
      (db: SQLiteObject)=>{
        db.executeSql('DELETE FROM room WHERE IDroom=?',[IDroom])
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


}
