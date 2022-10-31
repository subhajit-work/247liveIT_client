import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GoogleAnalyticsPageRoutingModule } from './google-analytics-routing.module';

import { GoogleAnalyticsPage } from './google-analytics.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule, //Share module import
    GoogleAnalyticsPageRoutingModule
  ],
  declarations: [GoogleAnalyticsPage]
})
export class GoogleAnalyticsPageModule {}
