import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReportViewPageRoutingModule } from './report-view-routing.module';

import { ReportViewPage } from './report-view.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule, //Share module import
    ReportViewPageRoutingModule
  ],
  declarations: [ReportViewPage]
})
export class ReportViewPageModule {}
