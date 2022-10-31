import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MenuController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';
import { CommonUtils } from 'src/app/services/common-utils/common-utils';
import * as moment from 'moment';

@Component({
  selector: 'app-social',
  templateUrl: './social.page.html',
  styleUrls: ['./social.page.scss'],
})
export class SocialPage implements OnInit {

  private dashboardDataSubscribe: Subscription;
  private tableDataSubscribe: Subscription;
  private paginationDataSubscribe: Subscription;
  get_user_dtls;
  listing_view_url;
  tableDate_view_url;
  pagination_url;
  setStartdate;
  viewLoadData;
  viewData;
  tableViewData;
  tableLoadData;
  toDate;
  fromDate;
  
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

  commonFunction(){
    
    // User detailsls get
    this.authService.globalparamsData.subscribe(res => {
      if(res != null || res != undefined){
        this.get_user_dtls = res.user;
        console.log('this.get_user_dtls aaa11 >>>>>>>>>>', this.get_user_dtls);
      }
    });
    
    // view page url name
    this.listing_view_url = 'get_facebookpost?userId='+this.get_user_dtls.userId;
    this.viewPageData();

    this.tableDate_view_url = 'get_ad_insights'
    // this.tableData('','');
    this.pagination_url = 'get_nextPrifacebookpost';
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

  // =========== datePicker start ===============

  startDate(type: string, event: MatDatepickerInputEvent<Date>) {
    // this.events.push(`${type}: ${event.value}`);
    console.log('startDate.type', type);
    console.log('startDate.event.value',  moment(event.value).format('DD/MM/YYYY'));
    
    this.fromDate = moment(event.value).format('YYYY-MM-DD');
    this.tableData(this.fromDate,this.toDate);
  }
  endDate(type: string, event: MatDatepickerInputEvent<Date>) {
    // this.events.push(`${type}: ${event.value}`);
    console.log('endDate.type', type);
    console.log('endDate.event.value', moment(event.value).format('DD/MM/YYYY'));
    this.toDate = moment(event.value).format('YYYY-MM-DD');
    this.tableData(this.fromDate,this.toDate);
  }
  // datePicker end

  // ================== Table data fetch start =====================
  tableData(from_date,to_date){
    
    // if(from_date && to_date){
      this.tableLoadData = true;
      this.tableDataSubscribe = this.http.get(this.tableDate_view_url+'?from_date='+from_date+'&to_date='+to_date+'&userId='+this.get_user_dtls.userId).subscribe(
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

  // pagination start
  nextPrevious(_data, _type){
    this.paginationDataSubscribe = this.http.get(this.pagination_url+'?type='+_type+'&paging_token='+_data+'&userId='+this.get_user_dtls.userId).subscribe(
      (res:any) => {
        this.tableLoadData = false;
        console.log("view data  res -------------------->", res.return_data);
        if(res.return_status > 0){
          this.viewData = res.return_data;
          console.log('tableLoadData>>', this.viewData);
          
        }
      },
      errRes => {
        this.tableLoadData = false;
      }
    );
  }
  // pagination end

  // ----------- destroy subscription start ---------
  ngOnDestroy() {
    if(this.dashboardDataSubscribe !== undefined){
      this.dashboardDataSubscribe.unsubscribe();
    }
    if(this.tableDataSubscribe !== undefined){
      this.tableDataSubscribe.unsubscribe();
    }
    if(this.paginationDataSubscribe !== undefined){
      this.paginationDataSubscribe.unsubscribe();
    }
  }
  // destroy subscription end

}
