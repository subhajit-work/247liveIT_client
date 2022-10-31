import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GoogleAdsPageRoutingModule } from './google-ads-routing.module';

import { GoogleAdsPage } from './google-ads.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule, //Share module import
    IonicModule,
    GoogleAdsPageRoutingModule
  ],
  declarations: [GoogleAdsPage]
})
export class GoogleAdsPageModule {}
