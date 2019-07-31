import { Injectable }    from '@angular/core';
import { Jsonp, URLSearchParams } from '@angular/http';
import { HttpClient, HttpClientJsonpModule } from '@angular/common/http';

@Injectable()
export class CampaignService {
  constructor(private jsonp: Jsonp, private http: HttpClient) { }

   private baseUrl = 'https://vtools.lndo.site/api/registration';
//  private baseUrl = 'https://api.myjson.com/bins/8ogsh';
  // get a pet based on their id
   getCampaignUsers(id: string) {
    let param = '?campaign_id='+id;
    return this.http.get(this.baseUrl+param);
  }
}