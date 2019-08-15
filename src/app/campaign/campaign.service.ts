import { Injectable } from '@angular/core';
import { Jsonp, URLSearchParams } from '@angular/http';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/observable';
import 'rxjs/add/observable/throw';
import { throwError } from 'rxjs';
@Injectable()
export class CampaignService {
  constructor(private http: HttpClient) { }

   private baseUrl = 'https://sandbox-vtools.pantheonsite.io/api/registration';
  // get a pet based on their id
   getCampaignUsers(id: string) {
    const param = '?campaign_id=' + id;
    return this.http.get(this.baseUrl + param).catch(this.errorHandler);
  }

  updateUserState(registrationId: string, state: string) {
    const userData: object = {
      rid: registrationId,
      values: [
        {
          field: 'state',
          value: state
        }
      ]
    };
    return this.http.put(this.baseUrl, JSON.stringify(userData)).catch(this.errorHandler);
  }

  private errorHandler(error: HttpErrorResponse) {
    return Observable.throwError(error.error ? error.error.msg : 'Server Error');
  }
}
