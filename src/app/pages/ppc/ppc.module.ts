import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PpcPageRoutingModule } from './ppc-routing.module';

import { PpcPage } from './ppc.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule, //Share module import
    PpcPageRoutingModule
  ],
  declarations: [PpcPage]
})
export class PpcPageModule {}
