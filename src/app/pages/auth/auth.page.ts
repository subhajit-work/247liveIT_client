import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController, MenuController, ModalController } from '@ionic/angular';
import { Observable, Subscription } from 'rxjs';
import { AppComponent } from 'src/app/app.component';
import { AuthService } from 'src/app/services/auth/auth.service';
import { CommonUtils } from 'src/app/services/common-utils/common-utils';
import { environment } from 'src/environments/environment';
import { ModalPage } from '../modal/modal.page';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {

  main_url = environment.apiUrl;
  file_url = environment.fileUrl;
  hide = true;

  isLoading = false;
  siteInfo;
  isLogin = true;
  userTypes;
  private formSubmitSubscribe: Subscription;
  
  constructor(
    public menuCtrl: MenuController,
    private authService:AuthService,
    private router:Router,
    private loadingController: LoadingController,
    private http : HttpClient,
    private alertCtrl: AlertController,
    private commonUtils: CommonUtils,
    private modalController : ModalController,
    private appComponent: AppComponent
  ) { }

  ngOnInit() {
    // menu hide
    this.menuCtrl.enable(false);

    this.formSubmitSubscribe =  this.authService.globalparamsData.subscribe(res => {
      console.log('authService',res);
      
      if(res && res != null && res != undefined && res != ''){
        if(res.token != undefined ){
          this.router.navigateByUrl('/dashboard');
        }
      }
    });

    // get Site Info
    this.formSubmitSubscribe = this.commonUtils.getSiteInfoObservable.subscribe(res =>{
      this.siteInfo = res;
    })
  }
  site_path;
  site_href;
  site_href_split;
  site_path_split;
  ionViewWillEnter() {
    
    // get Site Info
    this.formSubmitSubscribe = this.commonUtils.getSiteInfoObservable.subscribe(res =>{
      this.siteInfo = res;
    })

    /* this.site_path = window.location.pathname;
    this.site_href = window.location.href;
    this.site_href_split = window.location.href.split('/')[1];
    this.site_path_split = window.location.pathname.split('/')[1]; */

    // this.appComponent.userInfoData();

    // menu hide
    this.menuCtrl.enable(false);

    this.formSubmitSubscribe =  this.authService.globalparamsData.subscribe(res => {
      if(res && res != null && res != undefined && res != ''){
        if(res.token != undefined ){
          this.router.navigateByUrl('/dashboard');
        }
      }
    });

  }


  onSwitchAuthMode(){
    this.isLogin =! this.isLogin;
  }

  //---------------- login form submit start-----------------
    onSubmitForm(form:NgForm){
      this.isLoading = true;
      console.log('form >>', form.value);
      if(!form.valid){
        return;
      }
      const email = form.value.email;
      const password = form.value.password;

      if(this.isLogin){
        // login server data send
      }else{
        // signup server data send
      }

      this.authenticate(form, form.value);
      // form.reset();

    }

    // authenticate function
    authenticate(_form, form_data) {
      this.isLoading = true;
      this.loadingController
        .create({ keyboardClose: true, message: 'Logging in...' })
        .then(loadingEl => {
          loadingEl.present();
          let authObs: Observable<any>;
          
          
          if (this.isLogin) {
            authObs = this.authService.login('login', form_data, '');
            console.log('###########>>>', authObs);
            console.log('######form_data#####>>>', form_data);
            
          } else {
            // authObs = this.authService.signup(email, password);
          }
          console.log('authenticate@@', authObs);
          console.log('authenticate...........');
          this.formSubmitSubscribe = authObs.subscribe(
            resData => {
              console.log('resData =============))))))))))))))>', resData);
              if(resData.return_status > 0)
              {
                console.log('user Type =============))))))))))))))>', resData.return_data.user_type);
                /* this.userTypes = this.commonUtils.userTypes;
                console.log('user Type =============))))))))))))))>', this.userTypes); */

                // this.appComponent.userInfoData();
                // this.appComponent.initializeApp();

                /* if(resData.return_data.user_type == 'group'){
                  this.router.navigateByUrl('/dashboard');
                }else{
                  this.router.navigateByUrl('/transaction-list');

                } */

                this.router.navigateByUrl('/dashboard');

                
                /* setTimeout(() => {
                  // user menu call
                  this.appComponent.userInfoData();
                }, 10); */

                setTimeout(() => {
                  _form.reset();
                  loadingEl.dismiss();

                }, 2000);
                
                
              }else{
                loadingEl.dismiss();
                this.commonUtils.presentToast('error', resData.return_message);
              }
              
              // console.log("data login after resData ++++++>", resData);
              this.isLoading = false;
              // loadingEl.dismiss();
              // this.router.navigateByUrl('/places/tabs/discover');
            },
            errRes => {
              loadingEl.dismiss();
            }
          );
        });
    }
  // login form submit end

    private showAlert(message: string) {
      this.alertCtrl
        .create({
          header: 'Authentication failed',
          message: message,
          buttons: ['Okay']
        })
        .then(alertEl => alertEl.present());
    }

    // ..... resetPasswordOpenModal start ......
    async resetPasswordOpenModal(_identifier, _item, _items) {
      // console.log('_identifier >>', _identifier);
      let profileDetails_modal;
      profileDetails_modal = await this.modalController.create({
        component: ModalPage,
        cssClass: 'mymodalClass password',
        componentProps: { 
          identifier: _identifier,
          modalForm_item: _item,
          modalForm_array: _items
        }
      });
      
      // modal data back to Component
      profileDetails_modal.onDidDismiss()
      .then((getdata) => {
        console.log('getdata >>>>>>>>>>>', getdata);
        if(getdata.data == 'submitClose'){
        }

      });

      return await profileDetails_modal.present();
    }
    // resetPasswordOpenModal end 

  // ----------- destroy subscription start ---------
  ngOnDestroy() {
    if(this.formSubmitSubscribe !== undefined){
      this.formSubmitSubscribe.unsubscribe();
    }
  }
  // destroy subscription end

}
