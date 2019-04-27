import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { SQLite,SQLiteObject } from '@ionic-native/sqlite';
import { Toast } from '@ionic-native/toast';

import { Camera, CameraOptions } from '@ionic-native/camera';

@IonicPage()
@Component({
  selector: 'page-detailstudent',
  templateUrl: 'detailstudent.html',
})
export class DetailstudentPage {

  detailstudent={ IDstudent:0, name:"", tel:"", address:""};

  constructor(public navCtrl: NavController, public navParams: NavParams, public sqlite: SQLite, public toast: Toast,
    private camera: Camera) {

    //this.getData=navParams.get('IDstudent'); //รับข้อมูล IDstudent ที่ส่งเข้ามา
    this.getData(navParams.get('IDstudent'));

  }

  ionViewDidLoad(){
    //this.getData();
  }

  getData(IDstudent){
    this.sqlite.create(
      {
        name: 'ionicdb.db',
        location:'default'
      }
    )
    .then(
      (db: SQLiteObject)=>{
        db.executeSql("SELECT * FROM student WHERE IDstudent=?",[IDstudent])
        .then(res=>{ // res เป็นผลที่ได้หลังจากการ query
          if(res.rows.length>0){
            this.detailstudent.IDstudent=res.rows.item(0).IDstudent;
            this.detailstudent.name=res.rows.item(0).name;
            this.detailstudent.tel=res.rows.item(0).tel;
            this.detailstudent.address=res.rows.item(0).address;
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

 /* openCam(){
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    
    this.camera.getPicture(options).then((imageData) => {
     // imageData is either a base64 encoded string or a file URI
     // If it's base64 (DATA_URL):
     let base64Image = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
     // Handle error
    });
  }*/

}
