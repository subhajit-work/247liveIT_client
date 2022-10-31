import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CallTrackingPage } from './call-tracking.page';

const routes: Routes = [
  {
    path: '',
    component: CallTrackingPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CallTrackingPageRoutingModule {}
