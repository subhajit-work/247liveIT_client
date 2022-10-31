import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PpcPage } from './ppc.page';

const routes: Routes = [
  {
    path: '',
    component: PpcPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PpcPageRoutingModule {}
