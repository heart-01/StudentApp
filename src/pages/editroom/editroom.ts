import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { Toast } from '@ionic-native/toast';
import { HomePage } from './../home/home';

@IonicPage()
@Component({
  selector: 'page-editroom',
  templateUrl: 'editroom.html',
})
export class EditroomPage {
  IDroom:any;
  nameRoom:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private sqlite: SQLite, private toast: Toast) {
    this.getCurrentData(navParams.get('IDroom'));
  }

  getCurrentData(IDroom){
    this.sqlite.create({ name: "ionicdb.db",
    location: "default" 
   })
     .then((db:SQLiteObject)=>{
       db.executeSql("SELECT * from room WHERE IDroom=?",[IDroom])
         .then(
           res=>{  //res เก็บค่าที่ได้หลังจาก executeSql
            if(res.rows.length>0){
               this.nameRoom=res.rows.item(0).nameRoom;
               this.IDroom=res.rows.item(0).IDroom;
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


  //method update data
  updateData(){
    this.sqlite.create({ name: "ionicdb.db",
     location:"default"})
      .then(
        (db:SQLiteObject)=>{
          db.executeSql("UPDATE room SET nameRoom=? WHERE IDroom=?",
            [
              this.nameRoom,
              this.IDroom
            ])
            .then(res=>{
              console.log(res);
              this.toast.show('Data updated','3000','center')
              .subscribe(
                toast=>{
                  console.log(toast);
                  this.navCtrl.setRoot(HomePage);
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
