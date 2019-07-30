import 'rxjs-compat';
import { Component, OnDestroy, OnInit,TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { RequestOptions,Http, Response } from '@angular/http';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Person } from '../person';
import { ActivatedRoute } from '@angular/router';
import { NgbModalConfig, NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CampaignService } from './campaign.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-campaign',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './campaign.component.html',
  styleUrls: ['./campaign.component.scss'],
  providers: [ NgbModalConfig, NgbModal]
})

export class CampaignComponent implements OnInit, OnDestroy {

  users$: any[] = [];
  data: any;
  //dtOptions: DataTables.Settings = {};
  dtOptions: any;
  dtTrigger: Subject<any> = new Subject();
  persons: Person[] = [];

  closeResult: string;
  userDetail: any;

  users: Observable<string[]>;
  @ViewChild('editModal', { static: false, }) editModal : TemplateRef<any>; // Note: TemplateRef
  constructor(private http: HttpClient,private route: ActivatedRoute, private modalService: NgbModal, private campaignService:CampaignService) {
  }
  
  
  open(content,user) {
    this.userDetail = user;
    this.modalService.open(content, { size: 'lg' });
  }

  ngOnInit() {
    let campID = 23826;  
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      processing: true,
    };

    const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
        })
      };

      this.campaignService.getCampaignUsers("233").subscribe((res) => {
        this.users$ = res['data'];
        this.dtTrigger.next();       
      });  
}

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

}
