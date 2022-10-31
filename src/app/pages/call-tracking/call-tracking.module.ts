import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CallTrackingPageRoutingModule } from './call-tracking-routing.module';

import { CallTrackingPage } from './call-tracking.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule, //Share module import
    CallTrackingPageRoutingModule
  ],
  declarations: [CallTrackingPage]
})
export class CallTrackingPageModule {}
