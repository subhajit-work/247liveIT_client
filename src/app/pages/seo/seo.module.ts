import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SeoPageRoutingModule } from './seo-routing.module';

import { SeoPage } from './seo.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule, //Share module import
    SeoPageRoutingModule
  ],
  declarations: [SeoPage]
})
export class SeoPageModule {}
