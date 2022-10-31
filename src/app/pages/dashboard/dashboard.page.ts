import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MenuController } from '@ionic/angular';

import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';
import { CommonUtils } from 'src/app/services/common-utils/common-utils';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  private dashboardDataSubscribe: Subscription;
  private googleAdsDataSubscribe: Subscription;
  get_user_dtls;
  listing_view_url;
  setStartdate;
  viewLoadData;
  googleLoadData;
  viewData;
  googleAds_view_url;
  googleData;
  
  constructor(
    public menuCtrl: MenuController,
    private http : HttpClient,
    private authService: AuthService,
    private commonUtils : CommonUtils,
  ) {
  }

  ngOnInit() {
    
  }

  ionViewWillEnter() {
    this.menuCtrl.enable(true);
    this.commonFunction();
  }

  public generateData(baseval, count, yrange) {
    var i = 0;
    var series = [];
    while (i < count) {
      var x = Math.floor(Math.random() * (750 - 1 + 1)) + 1;
      var y =
        Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;
      var z = Math.floor(Math.random() * (75 - 15 + 1)) + 15;

      series.push([x, y, z]);
      baseval += 86400000;
      i++;
    }
    return series;
  }

  commonFunction(){
    
    // User detailsls get
    this.authService.globalparamsData.subscribe(res => {
      if(res != null || res != undefined){
        this.get_user_dtls = res;
        console.log('this.get_user_dtls aaa11 >>>>>>>>>>', this.get_user_dtls);
      }
    });
    
    // view page url name
    this.listing_view_url = 'get_dashboard?userId='+this.get_user_dtls.user.userId;
    this.viewPageData();

    // Google ads data url
    this.googleAds_view_url = 'GooglAds_details';
    this.googleAdsData();
  }

  // ================== view data fetch start =====================
  viewPageData(){
    console.log();
    
    this.viewLoadData = true;
    this.dashboardDataSubscribe = this.http.get(this.listing_view_url).subscribe(
      (res:any) => {
        this.viewLoadData = false;
        console.log("view data  res -------------------->", res.return_data);
        if(res.return_status > 0){
          this.viewData = res.return_data;
          console.log('Dashboard viewData>>', this.viewData);
          
        }
      },
      errRes => {
        this.viewLoadData = false;
      }
    );
  }
  // view data fetch end

  // ================== google ads data fetch start =====================
  googleAdsData(){
    this.googleLoadData = true;
    this.googleAdsDataSubscribe = this.http.get(this.googleAds_view_url+'?userId='+this.get_user_dtls.user.userId).subscribe(
      (res:any) => {
        this.googleLoadData = false;
        console.log("view data  res -------------------->", res.return_data);
        if(res.return_status > 0){
          this.googleData = res.return_data;
          console.log('Dashboard googleData>>', this.googleData);
        }
      },
      errRes => {
        this.googleLoadData = false;
      }
    );
  
}
// google ads data fetch end

// ----------- destroy subscription start ---------
  ngOnDestroy() {
    if(this.dashboardDataSubscribe !== undefined){
      this.dashboardDataSubscribe.unsubscribe();
    }
    if(this.googleAdsDataSubscribe !== undefined){
      this.googleAdsDataSubscribe.unsubscribe();
    }
  }
// destroy subscription end
}
