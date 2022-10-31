import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AlertController, LoadingController, ModalController, NavParams, Platform } from '@ionic/angular';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';
import { CommonUtils } from 'src/app/services/common-utils/common-utils';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.page.html',
  styleUrls: ['./modal.page.scss'],
})
export class ModalPage implements OnInit {

  // Variable start
  get_identifier;
  get_item;
  get_array;
  get_userName;
  heder_title;
  api_url;
  listing_view_url;
  viewLoadData;
  viewData;
  form_api;
  binaryImg;
  get_user_dtls;
  model: any = {};
  private dashboardDataSubscribe: Subscription;
  private formSubmitSubscribe: Subscription;
  // Variable end

  constructor(
    private plt: Platform,
    private modalController : ModalController,
    private http : HttpClient,
    private navParams : NavParams,
    private commonUtils: CommonUtils, // common functionlity come here
    private authService:AuthService,
    private loadingController: LoadingController,
    private alertCtrl: AlertController,
  ) { }

  ngOnInit() {
    this.get_identifier =  this.navParams.get('identifier');
    this.get_item =  this.navParams.get('modalForm_item');
    this.get_array =  this.navParams.get('modalForm_array');
    this.get_userName =  this.navParams.get('modalForm_userName');

    // User detailsls get
    this.authService.globalparamsData.subscribe(res => {
      if(res != null || res != undefined){
        this.get_user_dtls = res;
        console.log('this.get_user_dtls aaa11 >>>>>>>>>>', this.get_user_dtls);
      }
    });

    console.log('get_identifier', this.get_identifier);
    console.log('get_item', this.get_item);
    console.log('get_array', this.get_array);
    
    if(this.get_identifier == 'change_password_modal') {
      this.heder_title = 'Change Password';
      this.form_api = 'ChangePassword';
    }else if(this.get_identifier == 'reset_password_modal') {
      this.heder_title = 'Reset Password';
      this.form_api = 'forgotPassword';
    }
  }

  // ================== view data fetch start =====================
  viewPageData(){
    console.log();
    this.viewLoadData = true;
    this.dashboardDataSubscribe = this.http.post(this.listing_view_url,'').subscribe(
      (res:any) => {
        this.viewLoadData = false;
        console.log("view data  res -------------------->", res);
          this.viewData = res;
      },
      errRes => {
        this.viewLoadData = false;
      }
    );
  }
  // view data fetch end

  // =================== Form submit start =======================
  formLoading;
  apiForEmail;
  apiForPhone;
  apiForRole;
  onSubmitForm(form:NgForm){
    console.log("add form submit >", form.value);
    this.formLoading = true;

    // get form value
    let fd = new FormData();


    for (let val in form.value) {
      if(form.value[val] == undefined){
        form.value[val] = '';
      }
      fd.append(val, form.value[val]);
    };

    console.log('value >', fd);

    if(!form.valid){
      return;
    }

    let paymentObs: Observable<any>;
    paymentObs = this.authService.login(this.form_api, form.value, '');
  
    this.formSubmitSubscribe = paymentObs.subscribe(
      resData => {
        console.log('resData',resData);
        if(resData.return_status > 0){
          // this.commonUtils.presentToast(response.return_message);
          this.commonUtils.presentToast('success', resData.return_message);

          form.reset();
          this.modalController.dismiss('submitClose',resData.return_status );
        }
      },
      errRes => {
        
      }
    );

    /*this.formSubmitSubscribe = this.http.post(this.form_api, fd).subscribe(
      (response:any) => {
        this.formLoading = false;

        console.log("add form response >", response);

        if(response.status == 'Success'){
          this.commonUtils.presentToast('success', response.status);
          // this.get_array.push(response);
          form.reset();
          this.modalController.dismiss('submitClose',response.status );

          if(this.get_identifier == 'reset_password_modal') {
            this.showAlert(response.pwd);
          }else if(this.get_identifier == 'add_user_details_modal'){
            this.showAlert(response.password);
          }
          
        }else{
          this.commonUtils.presentToast('warning', response.status);
        }
      },
      errRes => {
        this.formLoading = false;
      }
    );*/

  }

  // Password created start
  async showAlert(_return) {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: 'Password created!',
      inputs: [
        {
          name: 'name1',
          type: 'text',
          value: _return,
        },
      ],
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Yes',
          handler: () => {
            console.log('Confirm Okay');
          }
        }
      ]
    });

    await alert.present();
  }
  // Password created end

  // close modal
  closeModal() {
    // this.modalController.dismiss(this.arrayList);
    this.modalController.dismiss();
  }

  onChangeValue(_value){
    console.log('_value',_value);
    
  }

  // ----------- destroy subscription start ---------
  ngOnDestroy() {
    if(this.dashboardDataSubscribe !== undefined){
      this.dashboardDataSubscribe.unsubscribe();
    }
    if(this.formSubmitSubscribe !== undefined){
      this.formSubmitSubscribe.unsubscribe();
    }
  }
// destroy subscription end

}
