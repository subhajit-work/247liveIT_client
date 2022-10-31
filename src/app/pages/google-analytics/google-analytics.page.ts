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
  selector: 'app-google-analytics',
  templateUrl: './google-analytics.page.html',
  styleUrls: ['./google-analytics.page.scss'],
})

export class GoogleAnalyticsPage implements OnInit {

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
    this.listing_view_url = 'Googlanalytics';
    // this.viewPageData();

    this.tableDate_view_url = 'get_ad_insights'

    // User detailsls get
    this.authService.globalparamsData.subscribe(res => {
      if(res != null || res != undefined){
        this.get_user_dtls = res.user;
        console.log('this.get_user_dtls aaa11 >>>>>>>>>>', this.get_user_dtls);
        this.viewPageData('','');
      }
    });
  }

  // ================== view data fetch start =====================
  viewPageData(from_date,to_date){
    console.log('from_date',from_date);
    console.log('to_date',to_date);
    if(from_date !== undefined && to_date !== undefined){
      let visitorSeries = [];
      this.viewLoadData = true;
      this.dashboardDataSubscribe = this.http.get(this.listing_view_url+'?startDate='+from_date+'&endDate='+to_date+'&user_id='+this.get_user_dtls.userId).subscribe(
        (res:any) => {
          this.viewLoadData = false;
          console.log("view data  res -------------------->", res.return_data);
          if(res.return_status > 0){
            this.viewData = res.return_data.data;
            console.log('Dashboard viewData>>', this.viewData);
            let NewVisitor:number;
            let ReturningVisitor:number;

            NewVisitor = parseInt(this.viewData.NewVisitor);
            ReturningVisitor = parseInt(this.viewData.ReturningVisitor);

            visitorSeries.push(NewVisitor);
            visitorSeries.push(ReturningVisitor);
            console.log('visitorSeries', visitorSeries);
            
            this.chartOptions = {
              series: visitorSeries,
              labels: ["New Visitor", "Returning Visitor"],
              chart: {
                width: 380,
                type: "pie"
              },
              responsive: [
                {
                  breakpoint: 480,
                  options: {
                    chart: {
                      width: 200
                    },
                    legend: {
                      position: "bottom"
                    }
                  }
                }
              ]
            }
            console.log('this.chartOptions', this.chartOptions);
            this.toDate = undefined;
            this.fromDate = undefined;
          }
        },
        errRes => {
          this.viewLoadData = false;
        }
      );
      
    }
    
  }
  // view data fetch end

  // =========== datePicker start ===============

  startDate(type: string, event: MatDatepickerInputEvent<Date>) {
    // this.events.push(`${type}: ${event.value}`);
    console.log('startDate.type', type);
    console.log('startDate.event.value',  moment(event.value).format('DD/MM/YYYY'));
    
    this.fromDate = moment(event.value).format('YYYY-MM-DD');
    // this.tableData(this.fromDate,this.toDate);
    this.viewPageData(this.fromDate,this.toDate);
  }
  endDate(type: string, event: MatDatepickerInputEvent<Date>) {
    // this.events.push(`${type}: ${event.value}`);
    console.log('endDate.type', type);
    console.log('endDate.event.value', moment(event.value).format('DD/MM/YYYY'));
    this.toDate = moment(event.value).format('YYYY-MM-DD');
    // this.tableData(this.fromDate,this.toDate);
    this.viewPageData(this.fromDate,this.toDate);
  }
  // datePicker end

  // ================== Table data fetch start =====================
  tableData(from_date,to_date){
    
    // if(from_date && to_date){
      this.tableLoadData = true;
      this.tableDataSubscribe = this.http.get(this.tableDate_view_url+'?from_date='+from_date+'&to_date='+to_date+'&ad_id='+this.get_user_dtls.ad_accountX).subscribe(
        (res:any) => {
          this.tableLoadData = false;
          console.log("view data  res -------------------->", res.return_data);
          if(res.return_status > 0){
            this.tableViewData = res.return_data;
            console.log('tableLoadData>>', this.tableViewData);
            
          }
        },
        errRes => {
          this.tableLoadData = false;
        }
      );
    // }
    
  }
  // Table data fetch end

  // ----------- destroy subscription start ---------
  ngOnDestroy() {
    if(this.dashboardDataSubscribe !== undefined){
      this.dashboardDataSubscribe.unsubscribe();
    }
    if(this.tableDataSubscribe !== undefined){
      this.tableDataSubscribe.unsubscribe();
    }
  }
  // destroy subscription end

}