import 'rxjs-compat';
import { Component, OnDestroy, OnInit, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { NgbModalConfig, NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CampaignService } from './campaign.service';
import { Observable } from 'rxjs/Observable';
import { TitleCasePipe } from '@angular/common';


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
  // dtOptions: DataTables.Settings = {};
  dtOptions: any;
  dtTrigger: Subject<any> = new Subject();

  closeResult: string;
  userDetail: any;

  users: Observable<string[]>;
  @ViewChild('editModal', { static: false, }) editModal: TemplateRef<any>; // Note: TemplateRef
  constructor(private http: HttpClient, private route: ActivatedRoute,
              private modalService: NgbModal, private campaignService: CampaignService, private titlecasePipe:TitleCasePipe) {  }

  open(content, user) {
    this.userDetail = user;
    this.modalService.open(content, { size: 'lg' });
  }

  ngOnInit() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      processing: true,
      autoWidth: true,
      dom: 'Bfrtip',
      buttons: [
       'pageLength',
      // ‘excel’,
       {
           extend: 'csvHtml5',
           fileName:  'CustomFileName' + '.xlsx',
           exportOptions: {
               columns: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
           },
           exportData: {decodeEntities: true}
       }
     ]
    };

    const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/text',
        })
      };
    const routeParams = this.route.snapshot.params;
    if (routeParams) {
      this.campaignService.getCampaignUsers(routeParams.id).subscribe((res) => {
        if (res['status'] === 1 ) {
          res['data'].list = res['data'].list.map(user => {
            user.state = res['data'].org_registration_states[user.state];
            return user;
          });
          this.users$ = res['data'];
          this.dtTrigger.next();
        } else {
          alert(res['msg']);
        }
      });
      // this.campaignService.updateUserState();
    } else {
        alert('Missing campaign Id');
    }
}

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  getKeyName(key){
    if(key in this.users$['field_name_mapping']){
      return this.users$['field_name_mapping'][key].name;
    }else{
      return this.titlecasePipe.transform(key.replace('_',' '));
    }
  }
}
