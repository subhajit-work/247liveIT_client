import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonHeaderComponent } from '../common-component/common-header/common-header.component';
// Material module start
import {MatExpansionModule} from '@angular/material/expansion';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatBadgeModule} from '@angular/material/badge';
import {MatButtonModule} from '@angular/material/button';
import {MatNativeDateModule, MatRippleModule} from '@angular/material/core';
import {MatTabsModule} from '@angular/material/tabs';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatTooltipModule} from '@angular/material/tooltip';
// Material module end
import { ProgressBarModule } from 'angular-progress-bar';
import { NgApexchartsModule } from 'ng-apexcharts';
import { NgSelectModule } from '@ng-select/ng-select'; // angular dropdown
import { CommonFooterComponent } from '../common-component/common-footer/common-footer.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SafeHtmlPipe } from '../pipe/safe-html.pipe';
import { MustMatchDirective } from '../directives/must-match.directive';

@NgModule({
  declarations: [
    CommonHeaderComponent, //header component share
    CommonFooterComponent, //footer component share
    SafeHtmlPipe,
    MustMatchDirective
  ],
  imports: [
    CommonModule,
    IonicModule,
    // Material module start
    MatExpansionModule,
    MatIconModule,
    MatMenuModule,
    MatBadgeModule,
    MatButtonModule,
    MatRippleModule,
    MatTabsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTooltipModule,
    // Material module end
    ProgressBarModule,
    NgApexchartsModule,
    NgSelectModule, // angular dropdown
    ReactiveFormsModule,
    FormsModule,
  ],
  exports: [
    CommonHeaderComponent, //header component share
    CommonFooterComponent, //footer component share
    // Material module start
    MatExpansionModule,
    MatIconModule,
    MatMenuModule,
    MatBadgeModule,
    MatButtonModule,
    MatRippleModule,
    MatTabsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTooltipModule,
    // Material module end
    ProgressBarModule,
    NgApexchartsModule,
    NgSelectModule, // angular dropdown
    ReactiveFormsModule,
    FormsModule,
    SafeHtmlPipe,
    MustMatchDirective
  ]
})
export class SharedModule { }
