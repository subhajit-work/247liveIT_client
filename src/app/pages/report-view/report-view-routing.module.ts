import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReportViewPage } from './report-view.page';

const routes: Routes = [
  {
    path: '',
    component: ReportViewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReportViewPageRoutingModule {}
