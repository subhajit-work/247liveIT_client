import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Storage } from '@ionic/storage';
import { ToastController } from '@ionic/angular';
import { NgForm } from '@angular/forms';
import { CommonUtils } from 'src/app/services/common-utils/common-utils';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.page.html',
  styleUrls: ['./user-profile.page.scss'],
})
export class UserProfilePage implements OnInit {

  
  private subscriptionDataSubscribe: Subscription;
  private getCardDetailsDataSubscribe: Subscription;
  private sendCardDetailsDataSubscribe: Subscription;
  private formSubmitSubscribe: Subscription;
  get_user_dtls;
  listing_view_url;
  getCardDetails_url;
  setStartdate;
  viewLoadData;
  viewData;
  cardDetails;
  form_api;
  model: any = {};
  userId;
  chooseCard;
  actionType;

  constructor(
    private authService: AuthService,
    private http : HttpClient,
    private storage: Storage, 
    public toastController: ToastController,
    private commonUtils: CommonUtils 
  ) { }

  ngOnInit() {
    this.commonFunction();
  }

  commonFunction(){
    // User detailsls get
    this.authService.globalparamsData.subscribe(res => {
      if(res != null || res != undefined){
        this.get_user_dtls = res;
        console.log('this.get_user_dtls aaa11 >>>>>>>>>>', this.get_user_dtls);
        this.userId = res.user.userId;
      }
    });
    
    // view page url name
    this.listing_view_url = 'packageStatusChange?user_id='+this.get_user_dtls.user.userId+'&subscriptionId='+this.get_user_dtls.package_data.subscriptionId+'&userSubscriptionId='+this.get_user_dtls.package_data.userSubscriptionId;
    this.getCardDetails_url = 'cardDetails?userId='+this.get_user_dtls.user.userId;

    this.getCardDetails();
    this.form_api = 'addcardDetails';
  }

  // ================== subscription data fetch start =====================
  subscriptionStatusChange(_type){
    console.log('_type', _type);
    
    this.viewLoadData = true;
    this.subscriptionDataSubscribe = this.http.get(this.listing_view_url+'&type='+_type).subscribe(
      (res:any) => {
        this.viewLoadData = false;
        console.log("view data  res -------------------->", res.return_data);
        if(res.return_status == 1){
          this.presentToast(res.return_message, 'my-tost-custom-classsuccess');
          this.logout();
        }else {
          this.presentToast(res.return_message, 'my-tost-custom-classerror')
        }
      },
      errRes => {
        this.viewLoadData = false;
      }
    );
  }
  // subscription data fetch end

  // ================== getCardDetails data fetch start =====================
  getCardDetails(){
    this.viewLoadData = true;
    this.getCardDetailsDataSubscribe = this.http.get(this.getCardDetails_url).subscribe(
      (res:any) => {
        this.viewLoadData = false;
        console.log("getCardDetails data  res -------------------->", res.return_data);
        this.cardDetails = res.return_data;
      },
      errRes => {
        this.viewLoadData = false;
      }
    );
  }
  // getCardDetails data fetch end

  onSubmit(form:NgForm){
    console.log("add form submit >", form.value);
  
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
        }
      },
      errRes => {
        
      }
    );
  }


  // =========== Default / Edit / Delete ATM card start ===============
  cardDetailsApiUrl;
  changeCardDetails(_action, _data) {
    console.log('_action>>', _action);
    console.log('_data>>', _data);
    this.actionType = _action;
    if(_action == 'choose'){
      this.chooseCard = _data;
    }
    let type = this.chooseCard.id;
    console.log('firstTwo', type.substring(0,2));
    console.log('firstTwo', type.substring(0,4));

    let cardType:any;
    cardType = type.substring(0,2);
    if(cardType == 'pm') {
      cardType = type.substring(0,2);
    }else {
      cardType = type.substring(0,4);
    }
    if(_action == 'add'){
      this.model = {};
    }else if(_action == 'edit') {
      this.form_api = 'editcardDetails';
      
      this.model = {
        number : this.chooseCard.card.last4,
        exp_month : this.chooseCard.card.exp_month,
        exp_year : this.chooseCard.card.exp_year,
        type : cardType,
        card_id: this.chooseCard.id
      }
      console.log('type>>>>', this.model);
      
    }else if(_action == 'delete'){
      this.cardDetailsApiUrl = 'deletecard?userId='+this.get_user_dtls.user.userId+'&card_id='+this.chooseCard.id+'&type='+cardType;
    }else if(_action == 'default'){
      this.cardDetailsApiUrl = 'setdefaultcard?userId='+this.get_user_dtls.user.userId+'&card_id='+this.chooseCard.id;
    }

    if(_action == 'delete' || _action == 'default') {
      this.sendCardDetailsDataSubscribe = this.http.get(this.cardDetailsApiUrl).subscribe(
        (res:any) => {
          console.log("sendCardDetailsDataSubscribe res -------------------->", res);
          if(res.return_status > 0){
            // this.commonUtils.presentToast(response.return_message);
            this.commonUtils.presentToast('success', res.return_message);
            this.actionType = '';
            this.chooseCard = '';
            this.getCardDetails();
          }
        },
        errRes => {
        }
      );
    }
    
    
  }
  resetData() {
    this.actionType = '';
    this.chooseCard = '';
    this.getCardDetails();
  }
  // End.............
  //======================= logout functionlity start ==============
  logout() {
    this.storage.clear().then(() => {
      console.log('all stroage data cleared');
      
       window.location.reload(); //working

    });
    // this._globalparamsData = null;
  }
  // logout functionlity end

  async presentToast(_massage, _class) {
    const toast = await this.toastController.create({
      message: _massage,
      duration: 2000,
      cssClass:_class,
    });
    toast.present();
  }

  // Download report
  downloadApp() {
    location.href = 'https://www.marketing-crm.bongtechsolutions.com/bongtech.apk';
  }

  // ----------- destroy subscription start ---------
    ngOnDestroy() {
      
      if(this.subscriptionDataSubscribe !== undefined){
        this.subscriptionDataSubscribe.unsubscribe();
      }
      if(this.getCardDetailsDataSubscribe !== undefined){
        this.getCardDetailsDataSubscribe.unsubscribe();
      }
      if(this.sendCardDetailsDataSubscribe !== undefined){
        this.sendCardDetailsDataSubscribe.unsubscribe();
      }
      if(this.formSubmitSubscribe !== undefined){
        this.formSubmitSubscribe.unsubscribe();
      }
    }
  // destroy subscription end
  

}
