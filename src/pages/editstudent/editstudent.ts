import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { Toast } from '@ionic-native/toast';
import { HomePage } from './../home/home';

@IonicPage()
@Component({
  selector: 'page-editstudent',
  templateUrl: 'editstudent.html',
})
export class EditstudentPage {

  data={ IDstudent:0, name:"", tel:"", address:"" };

  constructor(public navCtrl: NavController, public navParams: NavParams,  private sqlite: SQLite, private toast: Toast) {
    this.getCurrentData(navParams.get('IDstudent'));
  }

  getCurrentData(IDstudent){
    this.sqlite.create({ name: "ionicdb.db",
    location: "default" 
   })
     .then((db:SQLiteObject)=>{
       db.executeSql("SELECT * from student WHERE IDstudent=?",[IDstudent])
         .then(
           res=>{  //res เก็บค่าที่ได้หลังจาก executeSql
            if(res.rows.length>0){
               this.data.IDstudent=res.rows.item(0).IDstudent;
               this.data.name=res.rows.item(0).name;
               this.data.tel=res.rows.item(0).tel;
               this.data.address=res.rows.item(0).address;
            }
          }
         )
         .catch(e=>{
           console.log(e);
           this.toast.show(e,'3000','center')
             .subscribe(
               toast=>{
                 console.log(toast);
               }
             );

         });
     })
     .catch(e=>{
       console.log(e);
       this.toast.show(e,'3000','center')
         .subscribe(
           toast=>{
             console.log(toast);
           }
         );

     });
  }


  updateData(){
    this.sqlite.create({ name: "ionicdb.db",
     location:"default"})
      .then(
        (db:SQLiteObject)=>{
          db.executeSql("UPDATE student SET IDstudent=?, name=?, tel=?, address=? WHERE IDstudent=?",
            [
              this.data.IDstudent,
              this.data.name,
              this.data.tel,
              this.data.address,
              this.data.IDstudent
            ])
            .then(res=>{
              console.log(res);
              this.toast.show('Data updated','3000','center')
              .subscribe(
                toast=>{
                  console.log(toast);
                  this.navCtrl.setRoot(HomePage);
                  this.navCtrl.popToRoot(); //ใช้แสดงหน้าแรก popToRoot หน้าที่เซ็ตเอาไว้เป็น root page
                }
              );
            })
            .catch(e=>{
              console.log(e);
              this.toast.show(e,'3000','center')
                .subscribe(
                  toast=>{
                    console.log(toast);
                  }
                );  
            });

        }
      )
      .catch(e=>{
        console.log(e);
        this.toast.show(e,'3000','center')
          .subscribe(
            toast=>{
              console.log(toast);
            }
          );
      });
  }



}
