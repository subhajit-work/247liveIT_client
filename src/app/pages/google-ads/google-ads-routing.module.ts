import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GoogleAdsPage } from './google-ads.page';

const routes: Routes = [
  {
    path: '',
    component: GoogleAdsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GoogleAdsPageRoutingModule {}
