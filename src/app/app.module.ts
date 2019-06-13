import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { DataTablesModule } from 'angular-datatables';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';


import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    DataTablesModule,
    HttpModule,
    RouterModule.forRoot(
      [
        { path: '', component: AppComponent}
      ]
    )  ],
  providers: [],
  bootstrap: [ AppComponent ]
})
export class AppModule {}
