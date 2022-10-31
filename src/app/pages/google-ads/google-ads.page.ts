import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MenuController } from '@ionic/angular';
import * as moment from 'moment';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';
import { CommonUtils } from 'src/app/services/common-utils/common-utils';

import {
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexChart,
  ChartComponent
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
};

@Component({
  selector: 'app-google-ads',
  templateUrl: './google-ads.page.html',
  styleUrls: ['./google-ads.page.scss'],
})

export class GoogleAdsPage implements OnInit {

  private dashboardDataSubscribe: Subscription;
  private tableDataSubscribe: Subscription;
  get_user_dtls;
  listing_view_url;
  tableDate_view_url;
  setStartdate;
  viewLoadData;
  viewData;
  tableViewData;
  tableLoadData;
  toDate;
  fromDate;

  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;
  
  constructor(
    public menuCtrl: MenuController,
    private http : HttpClient,
    private authService: AuthService,
    private commonUtils : CommonUtils,
  ) {
    this.chartOptions = {
      
    };
  }

  ngOnInit() {
    this.commonFunction();
  }

  ionViewWillEnter() {
    this.menuCtrl.enable(true);
    this.commonFunction();
  }

  commonFunction(){
    
    // view page url name
    this.listing_view_url = 'GooglAds_details';
    // this.viewPageData();

    // User detailsls get
    this.authService.globalparamsData.subscribe(res => {
      if(res != null || res != undefined){
        this.get_user_dtls = res.user;
        console.log('this.get_user_dtls aaa11 >>>>>>>>>>', this.get_user_dtls);
        this.viewPageData();
      }
    });
  }

  // ================== view data fetch start =====================
  viewPageData(){
      this.viewLoadData = true;
      this.dashboardDataSubscribe = this.http.get(this.listing_view_url+'?userId='+this.get_user_dtls.userId).subscribe(
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

  // =========== datePicker start ===============


  // ----------- destroy subscription start ---------
  ngOnDestroy() {
    if(this.dashboardDataSubscribe !== undefined){
      this.dashboardDataSubscribe.unsubscribe();
    }
  }
  // destroy subscription end

}