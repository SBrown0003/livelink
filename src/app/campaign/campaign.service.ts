import { Injectable } from '@angular/core';
import { Jsonp, URLSearchParams } from '@angular/http';
import { HttpClient, HttpClientJsonpModule } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { HttpHeaders } from '@angular/common/http';

@Injectable()
export class CampaignService {
  constructor(private http: HttpClient) { }

   private baseUrl = 'https://vtools.lndo.site/api/registration';
  // get a pet based on their id
   getCampaignUsers(id: string) {
    const param = '?campaign_id=' + id;
    return this.http.get(this.baseUrl + param);
  }

  async updateUserState(registrationId: string, state: string) {
    const userData: object = {
      rid: registrationId,
      values: [
        {
          field: 'state',
          value: state
        }
      ]
    };
    await this.http.put(this.baseUrl, JSON.stringify(userData)).subscribe((data) => {
      console.log(data);
    });
  }
}
