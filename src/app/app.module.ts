import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { IonicStorageModule } from '@ionic/storage';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { InterceptorProvider } from './services/interceptors/interceptor';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { OnlyNumberDirective } from './directives/only-number.directive';
import { ModalPageModule } from './pages/modal/modal.module';

@NgModule({
  declarations: [AppComponent, OnlyNumberDirective],
  entryComponents: [],
  imports: [
    BrowserModule, 
    IonicModule.forRoot(),
    AppRoutingModule, 
    BrowserAnimationsModule,
    SharedModule, //share module import here
    IonicStorageModule.forRoot(),
    HttpClientModule,
    ModalPageModule,  // Modal page
  ],
  providers: [
    {provide: LocationStrategy, useClass: HashLocationStrategy},
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorProvider,
      multi: true
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
