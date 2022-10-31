import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InstagramPageRoutingModule } from './instagram-routing.module';

import { InstagramPage } from './instagram.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule, //Share module import
    InstagramPageRoutingModule
  ],
  declarations: [InstagramPage]
})
export class InstagramPageModule {}
