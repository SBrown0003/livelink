import { Injectable } from '@angular/core';
import { Jsonp, URLSearchParams } from '@angular/http';
import { HttpClient, HttpClientJsonpModule } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { HttpHeaders } from '@angular/common/http';

@Injectable()
export class CampaignService {
  constructor(private http: HttpClient) { }

   private baseUrl = 'http://vtools.lndo.site/api/registration';
  // get a pet based on their id
   getCampaignUsers(id: string) {
    const param = '?campaign_id=' + id;
    return this.http.get(this.baseUrl + param);
  }

  async updateUserState() {
    const userData: object = {
      rid: 24862,
      values: [
        {
          field: 'state',
          value: 'rejected_spam'
        }
      ]
    };
    await this.http.put(this.baseUrl, JSON.stringify(userData)).subscribe((data) => {
      // console.log(data);
    });
  }
}
