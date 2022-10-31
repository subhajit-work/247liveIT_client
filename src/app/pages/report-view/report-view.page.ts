import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';
import { CommonUtils } from 'src/app/services/common-utils/common-utils';

import { ChartComponent } from "ng-apexcharts";

import {
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexChart,
  ApexFill,
  ApexDataLabels,
  ApexLegend
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
  fill: ApexFill;
  legend: ApexLegend;
  dataLabels: ApexDataLabels;
};

@Component({
  selector: 'app-report-view',
  templateUrl: './report-view.page.html',
  styleUrls: ['./report-view.page.scss'],
})
export class ReportViewPage implements OnInit {

  @ViewChild("chart") chart: ChartComponent;
  public cost_per_action_type: Partial<ChartOptions>;

  private dashboardDataSubscribe: Subscription;
  get_user_dtls;
  listing_view_url;
  setStartdate;
  viewLoadData;
  viewData;
  toDate;
  fromDate;
  parms_action_name;
  parms_action_id;
  
  constructor(
    public menuCtrl: MenuController,
    private http : HttpClient,
    private authService: AuthService,
    private commonUtils : CommonUtils,
    private activatedRoute : ActivatedRoute,
  ) {
    this.cost_per_action_type = {
      chart: {
        width: 380,
        type: "donut"
      },
      dataLabels: {
        enabled: false
      },
      fill: {
        type: "gradient"
      },
      legend: {
        formatter: function(val, opts) {
          return val + " - " + opts.w.globals.series[opts.seriesIndex];
        }
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
    };
  }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.menuCtrl.enable(true);
    this.commonFunction();
  }

  commonFunction(){

    this.parms_action_name = this.activatedRoute.snapshot.paramMap.get('action');
    this.parms_action_id = this.activatedRoute.snapshot.paramMap.get('id');
    
    // User detailsls get
    this.authService.globalparamsData.subscribe(res => {
      if(res != null || res != undefined){
        this.get_user_dtls = res.user;
        console.log('this.get_user_dtls aaa11 >>>>>>>>>>', this.get_user_dtls);
      }
    });
    
    // view page url name
    this.listing_view_url = 'get_ad_insightsId?userId='+this.get_user_dtls.userId;
    this.viewPageData();
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
          let i;
          let costobjArraySeries=[];
          let costobjArrayLabels=[];
          for(i = 0; i < res.return_data.cost_per_action_type.length; i ++) {
            costobjArraySeries.push(parseFloat(res.return_data.cost_per_action_type[i].value));
            costobjArrayLabels.push(res.return_data.cost_per_action_type[i].action_type);
          }
          console.log('costobjArraySeries', costobjArraySeries);
          console.log('costobjArrayLabels', costobjArrayLabels);
          
          this.cost_per_action_type = {
            series: costobjArraySeries,
            labels: costobjArrayLabels,
            chart: {
              width: 380,
              type: "donut"
            },
            dataLabels: {
              enabled: false
            },
            fill: {
              type: "gradient"
            },
            legend: {
              formatter: function(val, opts) {
                return val + " - " + opts.w.globals.series[opts.seriesIndex];
              }
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
          };
          
        }
      },
      errRes => {
        this.viewLoadData = false;
      }
    );
  }
  // view data fetch end

  // ----------- destroy subscription start ---------
  ngOnDestroy() {
    if(this.dashboardDataSubscribe !== undefined){
      this.dashboardDataSubscribe.unsubscribe();
    }
  }
  // destroy subscription end

}
