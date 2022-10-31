import { Component, OnInit } from '@angular/core';
import { MenuController, ModalController, NavController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Storage } from '@ionic/storage';
import { ModalPage } from 'src/app/pages/modal/modal.page';

@Component({
  selector: 'common-header',
  templateUrl: './common-header.component.html',
  styleUrls: ['./common-header.component.scss'],
})
export class CommonHeaderComponent implements OnInit {

  showSearch: boolean = false;
  get_user_dtls;
  constructor(
    public menuCtrl: MenuController,
    private authService: AuthService,
    private navCtrl : NavController,
    private storage: Storage,
    private modalController : ModalController,
  ) { }

  ngOnInit() {
    this.menuCtrl.enable(true);
    this.commonFunction();
  }

  commonFunction(){
    
    // User detailsls get
    this.authService.globalparamsData.subscribe(res => {
      if(res != null || res != undefined){
        this.get_user_dtls = res;
        console.log('this.get_user_dtls aaa11 >>>>>>>>>>', this.get_user_dtls);
      }
    });
    
    
  }

  // Goto page start
  goToPage(_url, _item){
    console.log('goToPage _url >', _url);
    console.log('goToPage _item >', _item);
    // this.router.navigateByUrl(_url);

    this.navCtrl.navigateRoot(_url);
  }
  // Goto page end

  //======================= logout functionlity start ==============
  logout() {
    this.storage.clear().then(() => {
      console.log('all stroage data cleared');
      
       window.location.reload(); //working

    });
    // this._globalparamsData = null;
  }
// logout functionlity end

// ..... change Password modal start ......
async changePasswordOpenModal(_identifier, _item, _items) {
  // console.log('_identifier >>', _identifier);
  let changePassword_modal;
  changePassword_modal = await this.modalController.create({
    component: ModalPage,
    cssClass: 'mymodalClass password',
    componentProps: { 
      identifier: _identifier,
      modalForm_item: _item,
      modalForm_array: _items
    }
  });
  
  // modal data back to Component
  changePassword_modal.onDidDismiss()
  .then((getdata) => {
    console.log('getdata >>>>>>>>>>>', getdata);
    if(getdata.data == 'submitClose'){
      /* this.onListData(this.listing_url, this.displayRecord, this.pageNo, this.api_parms, this.searchTerm, this.cherecterSearchTerm, this.sortColumnName, this.sortOrderName, this.advanceSearchParms, this.urlIdentifire);  */
    }

  });

  return await changePassword_modal.present();
}
// change Password   modal end 

  showSearchBox(_item) {
    console.log('showSearch>>', this.showSearch);
    if(this.showSearch == false) {
      this.showSearch = true;
    }else{
      this.showSearch = false;
    }
  }

}
