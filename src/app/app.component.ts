import { DOCUMENT } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, Inject, Renderer2 } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuController, Platform } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from './services/auth/auth.service';
import { CommonUtils } from './services/common-utils/common-utils';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})

export class AppComponent {

  main_url = environment.apiUrl;
  file_url = environment.fileUrl;

  // variable define
  url_name;
  url_path_name;
  get_user_type;
  panelOpenState: boolean;
  userInfodDataLoading;
  private userInfoSubscribe: Subscription;
  private groupMenuDataSubscribe : Subscription;
  private dashboardDataSubscribe: Subscription;
  menuPages = [];
  menuPagesList;
  menuPages2 = [];
  activeMenuHilight;
  selectedItemActive;
  parentSelectedIndex;
  childSelectedIndex;
  siteInfo : any;
  isActive : boolean = false;
  siteInfoLoading;
  get_user_dtls;
  viewData;
  sticky_url;
  toggle: boolean = false;

  constructor(
    private platform: Platform,
    private activatedRoute : ActivatedRoute,
    private http : HttpClient,
    private authService : AuthService,
    public menuCtrl: MenuController,
    public renderer: Renderer2,
    public router : Router,
    private commonUtils: CommonUtils, // common functionlity come here
    @Inject(DOCUMENT) private _document: HTMLDocument //use for fabicon
  ) {

    this.onSiteInformation();
  }

  toggleMenu(_item) {
    console.log('', this.toggle);
    if(_item == false) {
      this.toggle = true;
      // this.menuCtrl.enable(true);
    }else{
      this.toggle = false;
      // this.menuCtrl.enable(false);
    }
  }


  ngOnInit(){
    // User detailsls get
    this.authService.globalparamsData.subscribe(res => {
      console.log('User detailsls get>>', res);
      
      if(res != null || res != undefined){
        this.get_user_dtls = res;
        console.log('this.get_user_dtls aaa11 >>>>>>>>>>', this.get_user_dtls);
      }
    });

    
  }

  initializeApp() {
    this.platform.ready().then(() => {
      
      // user data call
      this.userInfoData();
      
      // ----get current active url name start---
        this.activatedRoute.url.subscribe(activeUrl => {
          this.url_name = window.location.pathname;
          console.log('this.url_name app.componet.ts @@@>>', this.url_name.split('/')[1]);
        })
        
      //get current active url name end

      // observable data for all page url name get
      this.commonUtils.pagePathNameAnywhereObsv.subscribe(pathRes => {
        // console.log('common utility path page url name #### @@@@@@@ >>', pathRes);
        this.url_path_name = pathRes;
      });
      
      
    });
  }
  //------------------- menu item show get_user_dtlsstart------------------------


  

  // menu data call
  mapped;
  userInfoData(){

    // console.log('main componenttttttttttttttttttttttttttttttttttttttttttttttttttttttttt');

    this.menuPages = [];
    this.userInfodDataLoading = false;

    this.authService.globalparamsData.subscribe(res => {
      console.log('componet.ts Toke store >>>>>>>>>>>>>>>111', res);

      this.menuPages = [];

      
    });
  }
  menuClose(){
    this.menuCtrl.enable(false);
  }

  closeModal() {
    console.log('Clicked');
    // this.menuCtrl.enable(false);
    this.menuCtrl.toggle();
  }

  // ============site information get start =============
  site_path;
  site_href;
  site_href_split;
  site_path_split;
  site_url_name;
  onSiteInformation(){
    // console.log('this.url_name app.componet.ts  pathname @@@>>',  window.location.pathname);

    this.site_path = window.location.pathname;
    this.site_href = window.location.href;
    this.site_href_split = window.location.href.split('/')[1];
    this.site_path_split = window.location.pathname.split('/')[1];

    // server print reasult///////
    /* site_path > /ci/xcelero/online/ 
    site_href > https://demo.rnjcs.in/ci/xcelero/online/#/auth 
    site_href_split > 
    site_path_split > ci  */

    const parsedUrl = new URL(window.location.href);
    const baseUrl = parsedUrl.hostname;
    //console.log('parsedUrl> ', parsedUrl);
    console.log('baseUrl> ', baseUrl); // this will print http://example.com or http://localhost:4200
    if(baseUrl == 'localhost' || baseUrl == '192.168.1.218'){
      this.site_url_name = 'https://www.marketing-crm.bongtechsolutions.com/';
    }else{
      this.site_url_name = window.location.href;
    }

    this.siteInfoLoading = true;
    // initializeApp
    this.initializeApp();
    
  }
}