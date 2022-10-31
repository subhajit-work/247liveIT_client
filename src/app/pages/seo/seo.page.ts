import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Storage } from '@ionic/storage';
import { ToastController } from '@ionic/angular';
import { NgForm } from '@angular/forms';
import { CommonUtils } from 'src/app/services/common-utils/common-utils';
import { environment } from 'src/environments/environment';

const API_URL = environment.apiUrl;
const API_MASTER = environment.apiMaster;
@Component({
  selector: 'app-seo',
  templateUrl: './seo.page.html',
  styleUrls: ['./seo.page.scss'],
})

export class SeoPage implements OnInit {

  
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
  ionViewWillEnter() {
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
    
    this.getCardDetails_url = 'GetSocialReportDetails/'+this.get_user_dtls.user.userId;

    this.getCardDetails();
    this.form_api = 'addcardDetails';
  }

  // ================== getCardDetails data fetch start =====================
  getCardDetails(){
    this.viewLoadData = true;
    this.getCardDetailsDataSubscribe = this.http.get(this.getCardDetails_url).subscribe(
      (res:any) => {
        this.viewLoadData = false;
        console.log("getCardDetails data  res -------------------->", res);
        this.cardDetails = res;
      },
      errRes => {
        this.viewLoadData = false;
      }
    );
  }
  // getCardDetails data fetch end

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

  goToLink(_id){
    let url = API_URL+'/GetSocialReportDetailsD/'+_id;
    console.log('url',url);
    
    window.open(url, "_blank");
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