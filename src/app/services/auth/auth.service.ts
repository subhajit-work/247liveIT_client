import { Platform } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { BehaviorSubject, from } from 'rxjs';
import { take, map, tap, delay, switchMap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { environment } from '../../../environments/environment';
import { Location } from '@angular/common';
import { CommonUtils } from '../common-utils/common-utils';

 
const API_URL = environment.apiUrl;
const API_MASTER = environment.apiMaster;

/* tslint:disable */ 
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  // private _globalparamsData = null;
  private _globalparamsData = new BehaviorSubject(null);

  // get token session master as observable
  get globalparamsData(){
    return this._globalparamsData.asObservable();
  }

  // get token session master as a non observable
  public getTokenSessionMaster() {
    return this._globalparamsData.value;
  }

  constructor(
    private storage: Storage, 
    private plt: Platform,
    private http : HttpClient,
    private router: Router,
    private location: Location,
    private commonUtils: CommonUtils 
  ) { 
  }
 

  //================== auto login start ===================
    autoLogin(){
      // stroage data get
      console.log('autoLogin>>', this.storage);
      
      return from(this.storage.get('setStroageGlobalParamsData')).pipe(
        map(storData => {
          console.log('storData @@@@@@@>>>>>', storData);
          if(!storData || !storData.token && !storData.session && !storData.toke){
            return null;
          }
          const storeauth = {
            'token': storData.token,
            /* 'session': storData.session,*/
            'ad_account': storData.ad_account,
            'user': storData.user,
            'package_data': storData.package_data,
            'check_data': storData.check_data,
            'loginType': storData.loginType
          }
          return storeauth;
        }),
        tap(storeauthtication => {
          if (storeauthtication) {
            this._globalparamsData.next(storeauthtication);
          }
        }),
        map(userLog => {
          // console.log("auto login map userLog >>>", userLog);
          return !!userLog;  //return true/false(boolen value)
        })
      );
    }
  // auto login end
  
  // ================= login service call start ==================
    login(_url, _data, _siteInfo) {
      return this.http.post(`${_url}?ad_id=`+_siteInfo.id, _data).pipe(
        tap(this.setGlobalParams.bind(this)) //use for response value send
      );
    }
    // ---setGlobalParams function defination----
    private setGlobalParams(resData){
      console.log('..................set 11 >', resData);
      if(resData.return_status > 0){
        this.commonUtils.presentToast('success', resData.return_message);
        // window.location.reload();
      }
      this._globalparamsData.next(
        {
          'token': resData.return_data.user_data.token,
          /* 'session': resData.return_data.session_code, */
          'ad_account': resData.return_data.user_data.ad_account,
          'user': resData.return_data.user_data,
          'package_data': resData.return_data.package_data,
          'check_data': resData.return_data.check_data,
          'loginType': resData.return_data.user_data.loginType
        }
      );

      // stroage
      this.storeAuthData(resData);
    }
    //--- storeAuthData function defination---
    private storeAuthData(_data) {
      console.log('data>>>>>>>>>>>>>>>>>>>>>>>>', _data);
      // set stroage data
      this.storage.set('setStroageGlobalParamsData',  {
        'token': _data.return_data.user_data.token,
        /* 'session': _data.return_data.session_code,*/
        'ad_account': _data.return_data.user_data.ad_account,
        'user': _data.return_data.user_data,
        'package_data': _data.return_data.package_data,
        'check_data': _data.return_data.check_data,
        'loginType': _data.return_data.user_data.loginType,
      });
      // Plugins.Storage.set({ key: 'authData', value: data });
    }
  //login service call end

  //======================= logout functionlity start ==============
    logout() {
      this.storage.clear().then(() => {
        console.log('all stroage data cleared');
        this.router.navigateByUrl('/auth');

        this._globalparamsData = new BehaviorSubject(null);
        
        /* this.router.routeReuseStrategy.shouldReuseRoute = function () {
          return false;
        }; */

        // location.reload();

        // window.location.replace('/auth');

        // location.reload();
         window.location.reload(); //working

      });
      // this._globalparamsData = null;
    }
  // logout functionlity end
 
}