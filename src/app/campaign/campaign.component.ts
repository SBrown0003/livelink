import 'rxjs-compat';
import { Component, OnDestroy, OnInit, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { NgbModalConfig, NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CampaignService } from './campaign.service';
import { TitleCasePipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-campaign',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './campaign.component.html',
  styleUrls: ['./campaign.component.scss'],
  providers: [ NgbModalConfig, NgbModal]
})

export class CampaignComponent implements OnInit, OnDestroy {

  users$: any[] = [];
  registrationStates: any[] = [];
  // dtOptions: DataTables.Settings = {};
  dtOptions: any;
  dtTrigger: Subject<any> = new Subject();

  closeResult: string;
  userDetail: any;

  @ViewChild('editModal', { static: false, }) editModal: TemplateRef<any>; // Note: TemplateRef
  constructor(private http: HttpClient, private route: ActivatedRoute, private modalService: NgbModal,
              private campaignService: CampaignService, private titlecasePipe: TitleCasePipe, private toaster: ToastrService) {  }

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
          fileName: 'CustomFileName' + '.xlsx',
          exportOptions: {
            format: {
              body: (data, row, col, node) => {
                let nodeText = '';
                const spacer = node.childNodes.length > 1 ? ' ' : '';
                node.childNodes.forEach(childNode => {
                  const tempText = childNode.nodeName === 'SELECT' ? childNode.selectedOptions[0].textContent : childNode.textContent;
                  nodeText += tempText ? `${tempText} ${spacer}` : '';
                });
                return nodeText;
              }
            },
            columns: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
          },
          exportData: { decodeEntities: true }
        }
     ]
    };

    const routeParams = this.route.snapshot.params;
    if (routeParams && routeParams.id) {
      this.campaignService.getCampaignUsers(routeParams.id).subscribe((res) => {
        if (res['status'] === 1 ) {
          res['data'].list = res['data'].list.map(user => {
            const state: object = {
              key: user.state,
              value: res['data'].org_registration_states[user.state]
            };
            user.state = state;
            return user;
          });
          for (const machineState in res['data'].org_registration_states) {
            this.registrationStates.push({
              key: machineState,
              value: res['data'].org_registration_states[machineState]
            });
          }
          this.users$ = res['data'];
          this.dtTrigger.next();
        } else {
          alert(res['msg']);
        }
      }, errMsg => this.toaster.error(errMsg));
    } else {
        alert('Missing campaign Id');
    }
}

  getKeyName(key: any) {
    if (key in this.users$['field_name_mapping']) {
      return this.users$['field_name_mapping'][key].name;
    } else {
      return this.titlecasePipe.transform(key.replace('_', ' '));
    }
  }

  onStateChange(registrationId: any, state: any) {
    this.campaignService.updateUserState(registrationId, state).subscribe(res => {
      if (res['status'] === 1) {
        this.toaster.info('', res['msg']);
      }
    }, errMsg => this.toaster.error(errMsg));
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
}
