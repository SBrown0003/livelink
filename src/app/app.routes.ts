import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CampaignComponent } from "./campaign/campaign.component";
import { ErrorpageComponent } from './errorpage/errorpage.component';
// Route Configuration
export const routes: Routes = [
  { path: 'campaign/:id', component: CampaignComponent },
  { path: '**', component: ErrorpageComponent }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);