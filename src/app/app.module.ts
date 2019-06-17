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
        { path: ':campid', component: AppComponent},
        { path: 'live/:campid',
          component: AppComponent
          // resolve: {
          //   live: 'live'
          // }
        }
      ]
    )
  ],
  exports: [ RouterModule ],
  providers: [],
  bootstrap: [ AppComponent ]
})
export class AppModule {}
