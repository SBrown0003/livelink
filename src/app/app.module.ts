import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { DataTablesModule } from 'angular-datatables';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { routing } from './app.routes';
import { CampaignService } from './campaign/campaign.service';
import { TitleCasePipe } from '@angular/common';

import { AppComponent } from './app.component';
import { CampaignComponent } from './campaign/campaign.component';
import { ErrorpageComponent } from './errorpage/errorpage.component';

@NgModule({
  declarations: [
    AppComponent,
    CampaignComponent,
    ErrorpageComponent
  ],
  imports: [
    BrowserModule,
    DataTablesModule,
    HttpClientModule,
    FormsModule,
    NgbModule,
    routing,
    HttpClientJsonpModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-top-center',
      preventDuplicates: true,
    })
  ],
  exports: [ RouterModule ],
  providers: [CampaignService, TitleCasePipe],
  bootstrap: [ AppComponent ]
})
export class AppModule {}
